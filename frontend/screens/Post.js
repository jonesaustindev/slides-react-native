import React, { Component } from 'react';
import { Button } from "react-native";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SinglePost from '../components/SinglePost';
import navStyles from "../styles/navStyles";

class Post extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Home')}
                    title="Go Home"
                />
            ),
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
      largeImage
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