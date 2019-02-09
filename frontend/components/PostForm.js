import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

class PostForm extends Component {
    static defaultProps = {
        post: {},
    }

    state = {
        caption: this.props.post.caption || '',
    }

    submitForm = () => {
        this.props.onSubmit({
            caption: this.state.caption,
        })
    }

    render() {
        return (
            <Form>
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
                <Button title="Post" onPress={this.submitForm} />
            </Form>
        )
    }
}

const styles = StyleSheet.create({
    caption: {
    }
});

export default PostForm;