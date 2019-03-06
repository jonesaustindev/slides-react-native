import React from "react";
import { View, Text, Button } from "react-native";
import { Fab, Icon } from 'native-base';

import navStyles from '../styles/navStyles';
import AllPosts from "../components/AllPosts";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Home',
      ...navStyles,
    }
  }

  newPost = () => {
    this.props.navigation.navigate('NewPost');
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
        <Fab
          onPress={this.newPost}
          style={{ backgroundColor: '#82d8d8', padding: 20 }}
        >
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

export default Home;