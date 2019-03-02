import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import { Fab, Icon } from 'native-base';
import gql from 'graphql-tag';

import navStyles from '../styles/navStyles';

class Post extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
            ...navStyles
        }
    }
    //   editPost = () => {
    //     const { navigation, post } = this.props;
    //     navigation.navigate('EditPost', {
    //       id: post.id,
    //     });
    //   }
    //   <Fab
    //           onPress={this.editPost}
    //         >
    //           <Icon name="create" />
    //         </Fab>
    render() {
        <Query 
            query={post}
            variables={{
                id: this.props.navigation.state.params.id,
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return (
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
                if (error) return console.log(error);

                const post = data.post;
                console.log(post);
                return (
                    <View style={styles.container}>
                        <Text>Single Post</Text>
                    </View>
                )
            }}
        </Query>
    }
}

// <Text style={styles.bodyText}>{post.id}</Text>
//                         <Text style={styles.bodyText}>{post.caption}</Text>
//                         <Text style={styles.bodyText}>{post.user.id}</Text>
//                         <Text style={styles.bodyText}>Posted by: {post.user.name}</Text>

const post = gql`
  query post($id: ID!) {
    post(id: $id) {
      caption
      id
      user {
        id
        name
      }
    }
  }
`;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    bodyText: {
        fontSize: 16
    }
});

export default Post;