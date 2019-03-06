import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import navStyles from '../styles/navStyles';
import { post } from '../components/SinglePost';

class EditPost extends Component {
    static navigationOptions = {
        title: 'Edit Post',
        ...navStyles,
    }
    state = {
        loading: false,
    }

    editPost = ({ caption }) => {
        
    }
    
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const updatePost = gql`
    mutation updatePost($id: ID!, $caption: String) {
        updatePost(id: $id, caption: $caption) {
            id
            caption
        }
    }
`;

export default EditPost;