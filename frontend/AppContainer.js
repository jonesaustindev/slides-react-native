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

import { getToken, signIn, signOut } from './auth';

const HomeNavigator = createStackNavigator(
  {
    Home: Home,
    Post: Post,
    // NewPost: NewPost,
    // EditPost: EditPost,
  },
  {
    initialRouteName: 'Home',
  },
);

const UploadNavigator = createStackNavigator(
  {
    NewPost: NewPost,
    // EditPost: EditPost,
  },
  {
    initialRouteName: 'NewPost',
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
  // {
  //   // defaultNavigationOptions: ({ navigation }) => ({
  //   //   tabBarIcon: ({ focused, horizontal, tintColor }) => {
  //   //     const { routeName } = navigation.state;
  //   //     let IconComponent = Ionicons;
  //   //     let iconName;
  //   //     if (routeName === 'Home') {
  //   //       iconName = `ios-information-circle${focused ? '' : '-outline'}`;
  //   //       // Sometimes we want to add badges to some icons. 
  //   //       // You can check the implementation below.
  //   //       IconComponent = HomeIcon; 
  //   //     } else if (routeName === 'NewPost') {
  //   //       iconName = `ios-options${focused ? '' : '-outline'}`;
  //   //     } else if (routeName === 'Account') {
  //   //       iconName = `ios-options${focused ? '' : '-outline'}`;
  //   //     }

  //   //     // You can return any component that you like here!
  //   //     return <IconComponent name={iconName} size={25} color={tintColor} />;
  //   //   },
  //   // }),
  //   // tabBarOptions: {
  //   //   activeTintColor: 'tomato',
  //   //   inactiveTintColor: 'gray',
  //   //   showIcon: true,
  //   // },
  // },
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