import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { withApollo, graphql, compose } from 'react-apollo';
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
      const signin = await this.props.signin({
        variables: { email, password }
      })
      this.props.screenProps.changeLoginState(signin.data.signin.token);
      this.props.client.resetStore();
    } catch (err) {
      console.log(err);
    }
  }
  signin = async ({ email, password }) => {
    try {
      const signin = await this.props.signin({
        variables: { email, password }
      })
      this.props.screenProps.changeLoginState(signin.data.signin.token);
      this.props.client.resetStore();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.register ? <SignupForm onSubmit={this.signup} /> : <SigninForm onSubmit={this.signin} />}
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

const signup = gql`
  mutation signup($email: String!, $name: String!, $password: String!) {
      signup(email: $email, name: $name, password: $password) {
        token # token returned
      }
    }
`;

const signin = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
          token # token returned
        }
    }
`;

export default withApollo(compose(
  graphql(signup, { name: "signup" }),
  graphql(signin, { name: "signin" }),
)(Signup));