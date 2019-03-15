import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableHighlight, Dimensions } from 'react-native';
import { graphql } from 'react-apollo';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import gql from 'graphql-tag';
import Masonry from 'react-native-masonry';
import FullWidthImage from 'react-native-fullwidth-image';

import { endpoint } from '../config';
import styles from '../styles/postStyles';

const win = Dimensions.get('window');

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
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, width: win.width, }}
          data={allPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              style={styles.post}
            >
              <View style={styles.postContainer}>

                <View style={styles.postTitleContainer}>
                  <Text style={styles.postTitleText}>{item.title}</Text>
                </View>

                <TouchableHighlight
                  onPress={() => navigation.navigate('Post', {
                    id: item.id,
                    user: item.user.name,
                  })}
                >
                  <FullWidthImage
                    style={styles.postImages}
                    source={{ uri: `${endpoint}/${item.image}` }}
                  />
                </TouchableHighlight>
                  
                <View style={styles.UserContainer}>
                  <View style={{ height: 25, width: 25, backgroundColor: 'black', borderRadius: 14, marginRight: 4 }}>
                    {item.user.image && (
                      <Image source={{ uri: `${endpoint}/${item.user.image}` }} />
                    )}
                  </View>
                  <View style={styles.User}>
                    <Text style={styles.UserText}>Posted by <Text style={styles.TextBold}>{item.user.name}</Text></Text>
                  </View>
                </View>
              </View>
            </ListItem>
          )}
        />
      </View>
    )
  }
}

const allPosts = gql`
  query allPosts {
    allPosts {
      id
      createdAt
      title
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
export { allPosts };