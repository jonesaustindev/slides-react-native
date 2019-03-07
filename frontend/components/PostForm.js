import React, { Component } from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import { ImagePicker } from 'expo';
import { Form, Item, Input, Label } from 'native-base';
import styled from 'styled-components';

class PostForm extends Component {
    static defaultProps = {
        post: {},
    }

    state = {
        caption: this.props.post.caption || '',
        image: this.props.post.image || '',
        type: this.props.post.type || '',
        name: this.props.post.name || '',
    }

    submitForm = () => {
        this.props.onSubmit({
            caption: this.state.caption,
            image: this.state.image,
            type: this.state.type,
            name: this.state.name,
        })
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        if (!result.cancelled) {
            this.setState({
                image: result.uri,
                type: result.type,
                name: result.uri.split('ImagePicker/').pop(),
            });
            console.log(result);
            console.log(result.uri);
            console.log(this.state);
        }
    }

    render() {
        let { image } = this.state;
        return (
            <Container>
                <FormContainer>
                    <Form>
                        <View>
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
                        <View>
                            <StyledButton
                                title="Image"
                                onPress={this.pickImage}
                            />
                        </View>
                        {image ? (
                            <View>
                                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                            </View>
                        ) : null
                        }
                        <View>
                            <StyledButton title="Post" onPress={this.submitForm} />
                        </View>
                    </Form>
                </FormContainer>
            </Container>
        )
    }
}

const Container = styled.View`
    /* flex: 1; */
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.View`
    width: 75%;
`;

const StyledButton = styled.Button`
    /* margin: 15; */
`;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    }
});

export default PostForm;