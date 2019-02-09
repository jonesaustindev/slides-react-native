import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Posts extends Component {
    render() {
        const { navigation, allPosts } = this.props;
        if (!allPosts) return <ActivityIndicator size="large" />;
        return (
            <View>
                <List>
                    <FlatList
                        data={allPosts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ListItem
                                onPress={() => navigation.navigate('Post', {
                                    id: item.id,
                                    title: item.caption
                                })}
                            >
                                <Body>
                                    <Text>{item.caption}</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        )}
                    />
                </List>
            </View>
        )
    }
}

const ALL_POSTS_QUERY = gql`
    query ALL_POSTS_QUERY {
        allPosts(orderBy: createdAt_DESC) {
            id
            caption
        }
    }
`;

export default graphql(ALL_POSTS_QUERY, {
    props: ({ data }) => ({ ...data }),
})(Posts);
export { ALL_POSTS_QUERY };