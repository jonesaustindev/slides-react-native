import React, { Component } from 'react';
import { View } from 'react-native';

import UpdatePost from '../components/UpdatePost';
import navStyles from '../styles/navStyles';


class EditPost extends Component {
    static navigationOptions = {
        title: "Edit Post",
        ...navStyles
    }
    render() {
        return (
            <View>
                <UpdatePost {...this.props} />
            </View>
        )
    }
}

export default EditPost;