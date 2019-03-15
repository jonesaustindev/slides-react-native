import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Button, ScrollView } from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
// import { Fab, Icon } from 'native-base';

import { endpoint } from '../config';
import styles from '../styles/postStyles';

class Post extends Component {
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
                            <Text style={styles.MetaText}>Posted on</Text>
                            <Text style={styles.MetaText}><Text style={styles.TextBold}>March 13 2019</Text></Text>
                        </View>
                        <View style={styles.ButtonContainer}>
                            <View style={styles.Button}>
                                <Text style={styles.ButtonText}>Like</Text>
                            </View>
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
                        
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default Post;