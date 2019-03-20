import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Button, ScrollView, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Fab, Icon, ListItem } from 'native-base';

import { endpoint } from '../config';
import styles from '../styles/postStyles';

const win = Dimensions.get('window');

class SinglePost extends Component {
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
        const post = this.props.queryImagePost;
        if (!post) return (
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

        return (
            <ScrollView style={styles.ScrollContainer}>
                <View style={styles.Container}>

                    <View style={styles.ContentContainer}>
                        <FullWidthImage style={styles.Image} source={{ uri: `${endpoint}/${post.image}` }} />
                    </View>

                    <View style={styles.Meta}>
                        <View style={styles.MetaTextContainer}>
                            <Text style={styles.MetaTitle}><Text style={styles.TextBold}>{post.title}</Text></Text>
                            <Text style={styles.MetaText}>March 13 2019</Text>
                        </View>
                        <View style={styles.ButtonContainer}>
                            <TouchableHighlight>
                                <View style={styles.Button}>
                                    <Text style={styles.ButtonText}>Like</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.UserContainer}>
                        <View style={styles.UserImage}>
                            {post.user.image && (
                                <Image source={{ uri: `${endpoint}/${post.image}` }} />
                            )}
                        </View>
                        <View style={styles.User}>
                            <Text style={styles.UserText}>Posted by <Text style={styles.TextBold}>{post.user.name}</Text></Text>
                            <Text style={styles.UserText}>{post.caption}</Text>
                        </View>
                    </View>

                    <View style={styles.HR} />

                    <View style={styles.CommentsContainer}>
                        <Text style={styles.CommentsTitle}>Comments</Text>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1, width: win.width }}
                            data={this.props.postComments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.Comments}>
                                    <View style={{ height: 25, width: 25, backgroundColor: 'black', borderRadius: 14, marginRight: 4 }}>
                                        {item.user.image && (
                                            <Image source={{ uri: `${endpoint}/${item.user.image}` }} />
                                        )}
                                    </View>
                                    <View style={styles.CommentUserContainer}>
                                        <View style={styles.CommentUser}>
                                            <Text style={styles.UserText}><Text style={styles.TextBold}>{item.user.name}</Text></Text>
                                        </View>
                                        <View style={styles.CommentText}>
                                            <Text>{item.text}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        >

                        </FlatList>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const postComments = gql`
    query postComments($id: ID!) {
        postComments(id: $id) {
            id
            text
            user {
                id
                name
            }
        }
    }
`;

export default graphql(postComments, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
        variables: {
            id: navigation.state.params.id,
        }
    })
})(SinglePost);

// export default SinglePost;