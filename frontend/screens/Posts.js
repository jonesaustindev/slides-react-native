import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Posts extends Component {
    render() {
        const { navigation, posts } = this.props;
        if (!posts) return (
            <ActivityIndicator
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                size="large"
            />
        );
        return (
            <View>
                <List>
                    <FlatList
                        data={posts}
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

const posts = gql`
    query posts {
        posts {
            id
            caption
        }
    }
`;

export default graphql(posts, {
    props: ({ data }) => ({ ...data }),
})(Posts);
export { posts };