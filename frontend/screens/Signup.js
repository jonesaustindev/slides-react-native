import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';

class Signup extends Component {
    state = {
        register: true,
    }

    signup = async ({ email, name, password }) => {
        try {
            const user = await this.props.signup({
                variables: {
                    email,
                    name,
                    password,
                }
            });
            const signin = await this.props.login({
                variables: { email, password }
            });
            this.props.screenProps.changeLoginState(true, signin.data.login.token);
            this.props.client.resetStore();
        } catch (err) {
            console.log(err);
        }
    }

    signin = async ({ email, password }) => {
        try {
            const signin = await this.props.login({
                variables: { email, password }
            });
            this.props.screenProps.changeLoginState(true, signin.data.login.token);
            this.props.client.resetStore();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text> Signup Page </Text>
                {this.state.register ?
                    <SignupForm onSubmit={this.signup} /> :
                    <SigninForm onSubmit={this.signin} />
                }
                <Button
                    onPress={() => {
                        this.setState({
                            register: !this.state.register
                        })
                    }}
                    title={this.state.register ? 'Already a user? Click Here!' : 'Sign Up'}
                />
            </View>
        )
    }
}

const signup = gql`
    mutation signup($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password){
            token
        }
    }
`;

const login = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export default withApollo(compose(
    graphql(signup, { name: "signup" }),
    graphql(login, { name: "login" }),
)(Signup));