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
    this.props.signup({
      variables: {
        name,
        email,
        password,
      }
    }).then(({ data }) => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
      // const user = await this.props.createUser({
      //   variables: {
      //     name,
      //     email,
      //     password,
      //   }
      // });
      // console.log(user);
      // const signin = await this.props.signin({
      //   variables: { email, password }
      // })
      // if (signin) {
      //   console.log(user);
      //   console.log(signin);
      //   console.log(signin.data);
      // }
      // signIn(signin.data.signinUser.token);
      // this.props.client.resetStore();
    // try {
      
    // } catch (err) {
    //   console.log(err);
    // }
  }
  signin = async ({ email, password }) => {
    try {
      const signin = await this.props.signin({
        variables: { email, password }
      })
      console.log(signin);
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

const signup = gql`
    mutation signup($email: String!, $password: String!, $name: String!) {
        signup(
          data: {
            email: $email,
            password: $password,
            name: $name,
          }
        ) {
          jwt
          id
          name
        }
    }
`;

const signin = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: {
            email: $email
            password: $password
        }) {
            token
        }
    }
`;

export default withApollo(compose(
  graphql(signin, { name: "signin" }),
  graphql(signup, { name: "signup" }),
)(Signup));