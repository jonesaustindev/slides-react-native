import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Home from './screens/Home';
import Post from './screens/Post';
import NewPost from './screens/NewPost';
import EditPost from './screens/EditPost';
import Signup from './screens/Signup';

import { getToken, signIn, signOut } from './auth';

const AppNavigator = createStackNavigator({
    Home: {
        screen: withApollo(Home)
    },
    Post: {
        screen: Post
    },
    NewPost: {
        screen: NewPost
    },
    EditPost: {
        screen: EditPost
    },
});

const AppContainer = createAppContainer(AppNavigator);


export default class NavWrapper extends Component {
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
        if(this.state.loggedIn) {
            return (
                <AppContainer screenProps={{ changeLoginState: this.handleChangeLoginState }} />
            )
        } else {
            return (
                <Signup screenProps={{ changeLoginState: this.handleChangeLoginState }} />
            )
        }
    }
    // if (data.loading) return (
    //     <ActivityIndicator 
    //         style={{
    //             flex: 1,
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //         }} 
    //         size="large"
    //     />
    // )
    // if (!data.user) return <Signup />
    // console.log(data);
    // const user = data.user;
    // return <AppContainer screenProps={{ user }} />
}

// const me = gql`
//     query me {
//         me {
//             id
//             email
//             jwt
//         }
//     }
// `;

// export default graphql(me, {
//     prop: ({ data }) => ({ ...data }),
// })(NavWrapper);