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
    const { navigation, Post } = this.props;
    navigation.navigate('EditPost', {
      id: Post.id,
    });
  }
  render() {
    const { Post } = this.props;
    if (!Post) return <ActivityIndicator size="large" />
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>{Post.id}</Text>
        <Text style={styles.bodyText}>{Post.user.id}</Text>
        <Fab
          onPress={this.editPost}
        >
          <Icon name="create" />
        </Fab>
      </View>
    )
  }
}

const POST_QUERY = gql`
  query POST_QUERY($id: ID!) {
    Post(id: $id) {
      caption
      id
      user {
        id
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

export default graphql(POST_QUERY, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id,
    }
  })
})(Post);
export { POST_QUERY };