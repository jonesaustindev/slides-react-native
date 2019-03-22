import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { ImagePicker } from 'expo';
import { Form, Item, Input, Label, Card, CardItem, Button } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image';

import styles from '../styles/formStyles';

class PostForm extends Component {
    static defaultProps = {
        post: {},
    }

    state = {
        caption: this.props.post.caption || '',
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
            type: this.state.type,
            name: this.state.name,
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
        let { image } = this.state;
        return (
            <ScrollView>
                <View style={styles.Container}>
                    <Card style={styles.FormContainer}>
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
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

export default PostForm;