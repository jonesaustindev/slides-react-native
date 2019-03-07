import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';

import PostForm from '../components/PostForm';
import navStyles from '../styles/navStyles';
import { fileEndpoint } from '../config';
import { posts } from '../components/AllPosts';


class NewPost extends Component {
    static navigationOptions = {
        title: "New Post",
        ...navStyles
    }
    state = {
        loading: false
    }
    newPost = async ({ caption, image, name, type }) => {
        const { uploadImagePost, navigation } = this.props;
        this.setState({ loading: true });

        const imageFile = new ReactNativeFile({
            uri: image,
            type: 'image/jpg',
            name,
        });

        uploadImagePost({
            variables: {
                caption,
                image: imageFile,
            },
        })
            .then(() => {
                navigation.goBack();
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            })

        // const imagePost = new FormData();
        // imagePost.append('name', 'testName');
        // imagePost.append('photo', {
        //     uri: image,
        //     type: 'image/jpeg',
        //     name: name,
        // });
        // fetch('POST', fileEndpoint, {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        // }, [{
        //     name: 'data',
        //     filename: name,
        //     data: image,
        // }]).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
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

const uploadImagePost = gql`
    mutation uploadImagePost($caption: String, $image: Upload!) {
        uploadImagePost(caption: $caption, image: $image) {
            id
            createdAt
            caption
            image
            user {
                id
            }
        }
    }
`;

export default graphql(uploadImagePost, {
    name: "uploadImagePost"
})(NewPost);