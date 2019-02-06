import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import { Fab, Icon } from 'native-base';
import gql from 'graphql-tag';

import navStyles from '../styles/navStyles';

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

class Post extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      ...navStyles
    }
  }
  editPost = () => {
    this.props.navigation.navigate('EditPost', {
      id: this.props.navigation.state.params.id,
    });
  }
  render() {
    const postId = this.props.navigation.state.params.id;
    return(
      <Query 
        query={POST_QUERY}
        variables={{
          id: postId,
        }}
      >
        {({ data, loading, error }) => {
          if(loading) return <ActivityIndicator size="large" />;
          return (
            <View style={styles.container}>
              <Text style={styles.bodyText}>{data.Post.id}</Text>
              <Text style={styles.bodyText}>{data.Post.user.id}</Text>
              <Fab
                onPress={this.editPost}
              >
                <Icon name="add" />
              </Fab>
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 20
  },
  bodyText: {
    fontSize: 16
  }
});

export default Post;
export { POST_QUERY };