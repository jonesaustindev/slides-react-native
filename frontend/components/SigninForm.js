import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import { Mutation } from 'react-apollo';
import { SIGNIN_MUTATION } from './SignupForm';

class SigninForm extends Component {
    state = {
        email: '',
        password: '',
    }
    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
            >
                {(signinUser, { error, loading }) => {
                    if (loading) return <ActivityIndicator size="large" />;
                    return (
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={password => this.setState({ password })}
                                />
                            </Item>
                            <Button
                                title="Sign In"
                                onPress={this.submitForm}
                            />
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default SigninForm;