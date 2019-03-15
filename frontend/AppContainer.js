import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { withApollo } from 'react-apollo';

import Home from './screens/Home';
import Details from './screens/Details';
import Signup from './screens/Signup';
import Post from './screens/Post';
import NewPost from './screens/NewPost';
import EditPost from './screens/EditPost';

import { getToken, signIn, signOut } from './auth';


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Details: Details,
    Post: Post,
    NewPost: NewPost,
    EditPost: EditPost,
  },
  {
    initialRouteName: 'Home',
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fff"
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

const AppContainer = createAppContainer(AppNavigator);


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