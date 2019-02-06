import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SigninForm from './SigninForm';
import { signIn } from '../auth';


class SigninGQL extends Component {
    signin = async ({ email, password }) => {
        try {
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
                <Text>Sign In</Text>
                <SigninForm onSubmit={this.signin} type="Signin" />
            </View>
        )
    }
}

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

export default graphql(SIGNIN_MUTATION, { name: "signinUser" })(SigninGQL);