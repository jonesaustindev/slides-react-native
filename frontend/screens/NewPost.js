import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';

import PostForm from '../components/PostForm';
import navStyles from '../styles/navStyles';


class NewPost extends Component {
    static navigationOptions = {
        title: "New Post",
        ...navStyles,
    }
    state = {
        loading: false
    }
    newPost = async ({ caption, image, name, title }) => {
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
                title,
                image: imageFile,
            },
        })
            .then(() => {
                navigation.navigate('Home')
                this.forceUpdate()
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

const uploadImagePost = gql`
    mutation uploadImagePost($caption: String, $image: Upload!, $title: String!) {
        uploadImagePost(caption: $caption, image: $image, title: $title) {
            id
            createdAt
            caption
            image
            title
            user {
                id
            }
        }
    }
`;

export default graphql(uploadImagePost, {
    name: "uploadImagePost",
})(NewPost);