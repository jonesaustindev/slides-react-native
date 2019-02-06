import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Item, Input, Label } from 'native-base';

import { ALL_POSTS_QUERY } from '../screens/Posts';
import { POST_QUERY } from '../screens/Post';

const EDIT_POST_MUTATION = gql`
    mutation EDIT_POST_MUTATION($id: ID!, $userId: ID!) {
        updatePost(id: $id, userId: $userId) {
            id
        }
    }
`;

class UpdatePost extends Component {
    state = {
        caption: data.Post.caption
    }
    render() {
        return (
            <Query
                query={POST_QUERY}
                variables={{
                    id: this.props.navigation.state.params.id
                }}
            >
                {({ data, loading }) => {
                    if (loading) return <ActivityIndicator size="large" />
                    return (
                        <Mutation
                            mutation={EDIT_POST_MUTATION}
                            variables={{
                                caption: this.state.caption,
                                userId: this.props.screenProps.user.id,
                            }}
                            refetchQueries={[
                                { query: ALL_POSTS_QUERY },
                            ]}
                        >
                            {(updatePost, { error, loading }) => {
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
                                            await updatePost();
                                            navigation.goBack();
                                        }} />
                                    </Form>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

const styles = StyleSheet.create({
    caption: {
    }
});

export default UpdatePost;