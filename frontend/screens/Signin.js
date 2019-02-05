import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';

class Signin extends Component {
  state = {
    register: true,
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.register ? <SignupForm {...this.props} /> : <SigninForm {...this.props} />}
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

export default Signin;