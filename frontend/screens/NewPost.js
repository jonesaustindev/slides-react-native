import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from '../components/PostForm';
import navStyles from '../styles/navStyles';


class NewPost extends Component {
    static navigationOptions = {
        title: "New Post",
        ...navStyles
    }
    state = {
        loading: false
    }
    newPost = ({ caption }) => {
        const { createPost, navigation, screenProps } = this.props;
        this.setState({ loading: true });
        createPost({
            variables: {
                caption,
                userId: screenProps.user.id,
            }
        })
            .then(() => {
                navigation.goBack();
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            })
    }

    render() {
        return (
            <View>
                {this.state.loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <PostForm 
                        onSubmit={this.newPost}
                    />
                )}
            </View>
        )
    }
}

const NEW_POST_MUTATION = gql`
    mutation NEW_POST_MUTATION($caption: String, $userId: ID!) {
        createPost(caption: $caption, userId: $userId) {
            id
        }
    }
`;

export default graphql(NEW_POST_MUTATION, {
    name: "createPost",
    options: {
        refetchQueries: ["ALL_POSTS_QUERY"]
    }
})(NewPost);