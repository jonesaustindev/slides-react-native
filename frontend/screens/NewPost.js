import React, { Component } from 'react';
import { View } from 'react-native';

import PostForm from '../components/PostForm';
import navStyles from '../styles/navStyles';


class NewPost extends Component {
    static navigationOptions = {
        title: "New Post",
        ...navStyles
    }
    render() {
        return (
            <View>
                <PostForm {...this.props} />
            </View>
        )
    }
}

export default NewPost;