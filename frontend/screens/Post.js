import React, { Component } from 'react';
import { Button } from "react-native";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Fab, Icon } from 'native-base';

import SinglePost from '../components/SinglePost';
import navStyles from "../styles/navStyles";

class Post extends Component {
    static navigationOptions = ({ navigation }) => {
      const user = navigation.getParam('user');
        return {
            title: `Post by ${user}`,
            ...navStyles,
        }
    }
    render() {
        return (
            <SinglePost {...this.props} />
        );
    }
}

const queryImagePost = gql`
  query queryImagePost($id: ID!) {
    queryImagePost(id: $id) {
      id
      caption
      image
      title
      user {
        id
        name
      }
    }
  }
`;

export default graphql(queryImagePost, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
        variables: {
            id: navigation.state.params.id,
        }
    })
})(Post);

export { queryImagePost };