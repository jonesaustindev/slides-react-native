import React, { Component } from 'react';
import { View, Text } from 'react-native';
import navStyles from '../styles/navStyles';

class Image extends Component {
  static navigationOptions = {
    title: "Home",
    ...navStyles,
  }
  render() {
    return (
      <View>
        <Text>Image Page</Text>
      </View>
    )
  }
}

export default Image;