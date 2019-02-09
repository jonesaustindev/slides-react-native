import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from '../styles/navStyles';
import { POST_QUERY } from './Post';
import PostForm from '../components/PostForm';

class EditPost extends Component {
    static navigationOptions = {
        title: "Edit Post",
        ...navStyles
    }
    state = {
        loading: false
    }

    editPost = ({ caption }) => {
        const { updatePost, navigation, screenProps, Post } = this.props;
        this.setState({ loading: true });
        updatePost({
            variables: {
                id: Post.id,
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
                        post={this.props.Post} 
                        onSubmit={this.editPost} 
                    />
                )}
            </View>
        )
    }
}

const updatePost = gql`
    mutation updatePost($caption: String!, $userId: ID!, $id: ID!) {
        updatePost(caption: $caption, userId: $userId, id: $id) {
            id
        }
    }
`;

export default compose(
    graphql(POST_QUERY, {
        props: ({ data }) => ({ ...data }),
        options: ({ navigation }) => ({
            variables: {
                id: navigation.state.params.id,
            }
        })
    }),
    graphql(updatePost, {
        name: "updatePost",
        options: {
            refetchQueries: ["POST_QUERY"]
        }
    })
)(EditPost);