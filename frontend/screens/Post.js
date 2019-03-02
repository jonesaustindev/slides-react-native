import React, { Component } from 'react';
import { Button } from "react-native";
import Post from '../components/Post';
import navStyles from "../styles/navStyles";

class PostScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Home')}
                    title="Go Home"
                />
            ),
            ...navStyles,
        }
    }
    render() {
        return (
            <Post />
        );
    }
}

export default PostScreen;