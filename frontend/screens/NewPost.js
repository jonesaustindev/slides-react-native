import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import { RNS3 } from 'react-native-aws3';

import PostForm from '../components/PostForm';
import navStyles from '../styles/navStyles';
import { accessKey, secretAccessKey } from '../config';


class NewPost extends Component {
    static navigationOptions = {
        title: "New Post",
        ...navStyles,
    }
    state = {
        loading: false
    }
    newPost = async ({ caption, image, name, title, video }) => {
        const { uploadImagePost, navigation } = this.props;
        this.setState({ loading: true });

        console.log(video);

        const config = {
            keyPrefix: 'uploads/',
            bucket: 'slides-react-native',
            region: 'us-east-1',
            accessKey: accessKey,
            secretKey: secretAccessKey,
            successActionStatus: 201,
        }
        
        if (image) {
            const imageFile = new ReactNativeFile({
                uri: image,
                type: 'image/jpg',
                name,
            });

            // RNS3.put(imageFile, config)
            //     .then(res => {
            //         console.log(res)
            //     }).catch(err => {
            //         console.log(err)
            //     })
    
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
        if (video) {
            const videoFile = new ReactNativeFile({
                uri: video,
                type: 'video/mp4',
                name,
            });
            // const videoFile = new FormData();
            // videoFile.append('document', {
            //     video,
            //     name,
            //     type: 'video/mp4',
            // })
    
            uploadVideoPost({
                variables: {
                    caption,
                    title,
                    video: videoFile,
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
                            {...this.props}
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

const uploadVideoPost = gql`
    mutation uploadVideoPost($caption: String, $video: Upload!, $title: String!) {
        uploadVideoPost(caption: $caption, video: $video, title: $title) {
            id
            createdAt
            caption
            video
            title
            user {
                id
            }
        }
    }
`;

export default compose(
    graphql(uploadImagePost, {
        name: "uploadImagePost",
    }),
    graphql(uploadVideoPost, {
        name: 'uploadVideoPost'
    })
)(NewPost);