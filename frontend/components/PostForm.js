import React, { Component } from 'react';
import { Text, View, Image, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { ImagePicker, Video } from 'expo';
import { Form, Item, Input, Label, Button } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image';

import styles from '../styles/formStyles';

const win = Dimensions.get('window');

class PostForm extends Component {
    static defaultProps = {
        post: {},
    }

    state = {
        caption: this.props.post.caption || '',
        video: this.props.post.video || '',
        title: this.props.post.title || '',
        image: this.props.post.image || '',
        type: this.props.post.type || '',
        name: this.props.post.name || '',
    }

    submitForm = () => {
        this.props.onSubmit({
            caption: this.state.caption,
            title: this.state.title,
            image: this.state.image,
            video: this.state.video,
            type: this.state.type,
            name: this.state.name,
        })
    }

    videoFromCamera = (video) => {
        this.setState({
            video: video,
            type: 'video',
            name: video.split('Camera/').pop(),
        })
    }

    imageFromCamera = (image) => {
        this.setState({
            image: image,
            type: 'image',
            name: image.split('Camera/').pop(),
        })
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });
        if (!result.cancelled) {
            this.setState({
                image: result.uri,
                type: result.type,
                name: result.uri.split('ImagePicker/').pop(),
            });
        }
    }

    render() {
        let { image, video } = this.state;
        const { navigation } = this.props;
        return (
            <ScrollView>
                <KeyboardAvoidingView
                    style={styles.Container}
                    behavior='padding'
                >
                    <View style={styles.FormContainer}>
                        <Form>
                            <View>
                                <Item floatingLabel>
                                    <Label>
                                        Title
                                        </Label>
                                    <Input
                                        multiline
                                        onChangeText={title => this.setState({ title })}
                                        value={this.state.title}
                                        style={styles.title}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Label>
                                        Caption
                                    </Label>
                                    <Input
                                        multiline
                                        onChangeText={caption => this.setState({ caption })}
                                        value={this.state.caption}
                                        style={styles.caption}
                                    />
                                </Item>
                            </View>
                            <View style={styles.ButtonContainer}>
                                <Button
                                    onPress={() => navigation.navigate('CameraScreen', {
                                        imageFromCamera: this.imageFromCamera,
                                        videoFromCamera: this.videoFromCamera,
                                        ...this.props,
                                    })}
                                    rounded
                                    style={styles.UploadButton}
                                >
                                    <Text style={styles.ButtonText}
                                    >Camera Screen</Text>
                                </Button>
                            </View>
                            <View style={styles.ButtonContainer}>
                                <Button
                                    onPress={this.pickImage}
                                    rounded
                                    style={styles.UploadButton}
                                >
                                    <Text style={styles.ButtonText}
                                    >Upload Image</Text>
                                </Button>
                            </View>
                            {image ? (
                                <View style={styles.UploadedImageContainer}>
                                    <FullWidthImage source={{ uri: image }} style={styles.UploadedImage} />
                                </View>
                            ) : null
                            }
                            {video ? (
                                <View style={styles.UploadedVideoContainer}>
                                    <Video
                                        source={{ uri: video }}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="contain"
                                        shouldPlay
                                        isLooping
                                        style={styles.UploadedVideo}
                                    />
                                </View>
                            ) : null
                            }
                            <View style={styles.FormSubmitButtonContainer}>
                                <Button
                                    style={styles.FormSubmitButton}
                                    onPress={this.submitForm}
                                    rounded
                                >
                                    <Text style={styles.ButtonText}>Post</Text>
                                </Button>
                            </View>
                        </Form>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default PostForm;