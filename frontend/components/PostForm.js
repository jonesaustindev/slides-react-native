import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Item, Input, Label } from 'native-base';

import { ALL_POSTS_QUERY } from '../screens/Posts';

const NEW_POST_MUTATION = gql`
    mutation NEW_POST_MUTATION($caption: String, $userId: ID!) {
        createPost(caption: $caption, userId: $userId) {
            id
        }
    }
`;

class PostForm extends Component {
    state = {
        caption: "",
    }
    render() {
        return (
            <Mutation
                mutation={NEW_POST_MUTATION}
                variables={{
                    caption: this.state.caption,
                    userId: this.props.screenProps.user.id,
                }}
                refetchQueries={[
                    { query: ALL_POSTS_QUERY },
                ]}
            >
                {(createPost, { error, loading }) => {
                    const { navigation } = this.props;
                    if (loading) return <ActivityIndicator size="large" />;
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
                            <Button title="Post" onPress={async () => {
                                await createPost();
                                this.props.navigation.goBack();
                            }} />
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

const styles = StyleSheet.create({
    caption: {
    }
});

export default PostForm;
export { NEW_POST_MUTATION };