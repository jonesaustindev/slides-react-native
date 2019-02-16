import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Home from './screens/Home';
import Post from './screens/Post';
import NewPost from './screens/NewPost';
import EditPost from './screens/EditPost';
import Signup from './screens/Signup';

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

const NavWrapper = ({ data }) => {
    if (data.loading) return (
        <ActivityIndicator 
            style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} 
            size="large"
        />
    )
    if (!data.user) return <Signup />
    const user = data.user;
    return <AppContainer screenProps={{ user }} />
}

const USER_QUERY = gql`
    query USER_QUERY {
        user {
            id
            email
            posts {
                id
                caption
            }
        }
    }
`;

export default graphql(USER_QUERY, {
    prop: ({ data }) => ({ ...data })
})(NavWrapper);
