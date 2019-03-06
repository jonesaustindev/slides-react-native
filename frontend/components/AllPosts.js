import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import gql from 'graphql-tag';

class AllPosts extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Query 
          query={posts}
          notifyOnNetworkStatusChange
        >
          {({ loading, error, data }) => {
            if (loading) return <ActivityIndicator size="large" />
            if (error) return console.log(error);

            const posts = data.posts;
            return (
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
            )
          }}
        </Query>
      </View>
    )
  }
}

const posts = gql`
  query posts {
    posts {
      id
      createdAt
      caption
      user {
        name
      }
    }
  }
`;

export default AllPosts;
export { posts };