import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { withApollo, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import { signIn } from '../auth';

class Signup extends Component {
  state = {
    register: true,
  }
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
      <View style={styles.container}>
        {this.state.register ? <SignupForm onSubmit={this.createUser} /> : <SigninForm onSubmit={this.signin} />}
        <Button
          onPress={() =>
            this.setState({
              register: !this.state.register
            })}
          title={this.state.register ? 'Already a user? Click Here!' : 'Sign Up'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  }
})

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

export default withApollo(compose(
  graphql(SIGNIN_MUTATION, { name: "signinUser" }),
  graphql(SIGNUP_MUTATION, { name: "createUser" }),
)(Signup));