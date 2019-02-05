import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Fab, Icon } from 'native-base';

import navStyles from './styles/navStyles';

import Posts from './screens/Posts';
import Post from './screens/Post';
import NewPost from './screens/NewPost';
import Signin from './screens/Signin';

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
        screen: Home
    },
    Post: {
        screen: Post
    },
    NewPost: {
        screen: NewPost
    },
});

const AppContainer = createAppContainer(AppNavigator);

const NavWrapper = (props) => {
    return <Signin {...props} />
    return <AppContainer />
}


export default NavWrapper;
