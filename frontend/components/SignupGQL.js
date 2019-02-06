import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import SignupForm from './SignupForm';
import { signIn } from '../auth';


class SignupGQL extends Component {
    createUser = async ({ email, name, password }) => {
        try {
            const user = await this.props.createUser({
                variables: { name, email, password }
            });
            const signin = await this.props.signinUser({
                variables: { email, password }
            })
            signIn(signin.data.signinUser.token);
            this.props.client.resetStore();          
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <View>
                <Text>Register</Text>
                <SignupForm onSubmit={this.createUser} type="Register" />
            </View>
        )
    }
}

const SIGNUP_MUTATION = gql`
        mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String!) {
            createUser(
                name: $name
                authProvider: { email: {
                    email: $email
                    password: $password
                } }
            ) {
                id
            }
        }
    `;

const SIGNIN_MUTATION = gql`
        mutation SIGNIN_MUTATION($email: String!, $password: String!) {
            signinUser(email: {
                email: $email
                password: $password
            }) {
                token
            }
        }
    `;

export default compose(
    graphql(SIGNIN_MUTATION, { name: "signinUser" }),
    graphql(SIGNUP_MUTATION, { name: "createUser" }),
)(SignupGQL);