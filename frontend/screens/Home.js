import React from "react";
import { View, Text, Button } from "react-native";

import navStyles from '../styles/navStyles';
import AllPosts from "../components/AllPosts";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Home',
      ...navStyles,
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>Home Screen</Text>
        <AllPosts {...this.props} />
        <Button 
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              title: 'Details Here',
            })
          }}
        />
        <Button 
          onPress={() => {
              this.props.screenProps.changeLoginState(false);
          }}
          title="Sign Out"
        />
      </View>
    );
  }
}

export default Home;