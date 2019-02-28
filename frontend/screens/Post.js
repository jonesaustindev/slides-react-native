import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import { Fab, Icon } from 'native-base';
import gql from 'graphql-tag';

import navStyles from '../styles/navStyles';

class Post extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      ...navStyles
    }
  }
  editPost = () => {
    const { navigation, post } = this.props;
    navigation.navigate('EditPost', {
      id: post.id,
    });
  }
  render() {
    const { post } = this.props;
    if (!post) return (
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
      <View style={styles.container}>
        <Text style={styles.bodyText}>{post.id}</Text>
        <Text style={styles.bodyText}>{post.caption}</Text>
        <Text style={styles.bodyText}>{post.user.id}</Text>
        <Text style={styles.bodyText}>Posted by: {post.user.name}</Text>
        <Fab
          onPress={this.editPost}
        >
          <Icon name="create" />
        </Fab>
      </View>
    )
  }
}

const post = gql`
  query post($id: ID!) {
    post(id: $id) {
      caption
      id
      user {
        id
        name
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  bodyText: {
    fontSize: 16
  }
});

export default graphql(post, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id,
    }
  })
})(Post);
export { post };