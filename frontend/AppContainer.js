import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { withApollo } from 'react-apollo';
import { Image, TouchableHighlight } from 'react-native';

import Home from './screens/Home';
import Signup from './screens/Signup';
import Post from './screens/Post';
import NewPost from './screens/NewPost';
import EditPost from './screens/EditPost';
import Account from './screens/Account';
import CameraScreen from './components/CameraScreen';

import { getToken, signIn, signOut } from './auth';

const HomeNavigator = createStackNavigator(
  {
    Home: Home,
    Post: Post,
  },
  {
    initialRouteName: 'Home',
  },
);

const UploadNavigator = createStackNavigator(
  {
    NewPost: NewPost,
    CameraScreen: CameraScreen,
    // EditPost: EditPost,
  },
  {
    initialRouteName: 'NewPost', //CameraScreen
  },
)

const AccountNavigator = createStackNavigator(
  {
    Account: Account,
    // EditPost: EditPost,
  },
  {
    initialRouteName: 'Account',
  },
)

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,

      navigationOptions: {
        tabBarIcon: () => (
          <Image
            style={{ height: 35, width: 35 }}
            source={require('./assets/home-3-64.png')}
          />
        )
      },
    },
    NewPost: {
      screen: UploadNavigator,

      navigationOptions: {
        tabBarIcon: () => (
          <Image
            style={{ height: 35, width: 35 }}
            source={require('./assets/add-64.png')}
          />
        )
      },
    },
    Account: {
      screen: AccountNavigator,

      navigationOptions: {
        tabBarIcon: () => (
          <Image
            style={{ height: 35, width: 35 }}
            source={require('./assets/user-64.png')}
          />
        )
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#ace58a',
      showIcon: true,
      showLabel: false,
      labelStyle: {
        fontSize: 12,
        color: '#FFF'
      },
      style: {
        backgroundColor: "#89da59"
      },
      headerTitleStyle: {
        color: "#FFF"
      },
      headerBackTitleStyle: {
        color: "#FFF"
      },
      headerTintColor: "#FFF",
    }
  }
);

const AppContainer = createAppContainer(BottomNavigator);

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }
  async componentDidMount() {
    const token = await getToken();
    if (token) {
      this.setState({
        loggedIn: true,
      })
    }
  }

  handleChangeLoginState = (loggedIn = false, token) => {
    this.setState({ loggedIn });
    if (loggedIn) {
      signIn(token);
    } else {
      signOut();
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <AppContainer
          screenProps={{
            changeLoginState: this.handleChangeLoginState
          }}
        />
      )
    } else {
      return (
        <Signup
          screenProps={{
            changeLoginState: this.handleChangeLoginState
          }}
        />
      )
    }
  }
}

export default withApollo(AppWrapper);