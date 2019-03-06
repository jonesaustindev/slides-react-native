import React, { Component } from 'react';
import { Button } from "react-native";
import SinglePost from '../components/SinglePost';
import navStyles from "../styles/navStyles";

class Post extends Component {
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
            <SinglePost {...this.props} />
        );
    }
}

export default Post;