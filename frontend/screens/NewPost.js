import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostForm from '../components/PostForm';
import navStyles from '../styles/navStyles';
import { fileEndpoint } from '../config';


class NewPost extends Component {
    static navigationOptions = {
        title: "New Post",
        ...navStyles
    }
    state = {
        loading: false
    }
    newPost = ({ caption, image, name }) => {
        const { createPost, navigation, screenProps } = this.props;
        this.setState({ loading: true });

        const imagePost = new FormData();
        imagePost.append('name', 'testName');
        imagePost.append('photo', {
            uri: image,
            type: 'image/jpeg',
            name: name,
        });
        fetch('POST', fileEndpoint, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }, [{
            name: 'data',
            filename: name,
            data: image,
        }]).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

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
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        size="large"
                    />
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