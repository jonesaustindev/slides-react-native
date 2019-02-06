import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { withApollo } from 'react-apollo';

import SignupGQL from '../components/SignupGQL';
import SigninGQL from '../components/SigninGQL';

class Signin extends Component {
  state = {
    register: true,
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.register ? <SignupGQL {...this.props} /> : <SigninGQL {...this.props} />}
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

export default withApollo(Signin);