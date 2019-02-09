import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Fab, Icon } from 'native-base';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from './styles/navStyles';

import Posts from './screens/Posts';
import Post from './screens/Post';
import NewPost from './screens/NewPost';
import EditPost from './screens/EditPost';
import Signup from './screens/Signup';
import { signOut } from './auth';

class Home extends React.Component {
    static navigationOptions = {
        title: "Home",
        ...navStyles,
    }

    newPost = () => {
        this.props.navigation.navigate('NewPost');
    }

    render() {
        return (
            <View style={styles.container}>
                <Posts {...this.props} />
                <Button 
                    onPress={() => {
                        signOut();
                        this.props.client.resetStore();
                    }}
                    title="Sign Out"
                />
                <Fab
                    onPress={this.newPost}
                    style={styles.newPost}
                >
                    <Icon name="add" />
                </Fab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    newPost: {
        backgroundColor: "#82d8d8",
        padding: 20
    },
});

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
    if (data.loading) <ActivityIndicator size="large" />
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
