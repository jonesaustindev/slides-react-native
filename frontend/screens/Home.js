import React from "react";
import { View, Text, Button } from "react-native";
import { Fab, Icon } from 'native-base';

import navStyles from '../styles/navStyles';
import AllPosts from "../components/AllPosts";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Slides',
      ...navStyles
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <AllPosts {...this.props} />
      </View>
    );
  }
}

export default Home;