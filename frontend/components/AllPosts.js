import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import gql from 'graphql-tag';

import { endpoint } from '../config';

const styles = StyleSheet.create({
  images: {
    height: 50,
    width: 50,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  }
})

class AllPosts extends Component {
  render() {
    const { navigation, allPosts } = this.props;
    if (!allPosts) return (
      <ActivityIndicator
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        size="large"
      />
    )
    return (
      <View>
        <List>
          <FlatList
            data={allPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                style={styles.row}
                onPress={() => navigation.navigate('Post', {
                  id: item.id,
                  title: item.caption
                })}
              >
                <Image
                  style={{ height: 50, width: 50 }}
                  source={{ uri: `${endpoint}/${item.image}` }}
                />
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

const allPosts = gql`
  query allPosts {
    allPosts {
      id
      createdAt
      caption
      image
      user {
        name
      }
    }
  }
`;

export default graphql(allPosts, {
  props: ({ data }) => ({ ...data })
})(AllPosts);