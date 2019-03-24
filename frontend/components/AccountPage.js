import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { ListItem, Button } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image';

import { endpoint } from '../config';
import accountStyles from '../styles/accountStyles';
import styles from '../styles/postStyles';

class AccountPage extends Component {
    render() {
        const { navigation, user } = this.props;
        return (
            <ScrollView>
                <View style={accountStyles.Container}>

                    <View style={accountStyles.ButtonContainer}>
                        <Button
                            rounded
                            style={accountStyles.SignOutButton}
                            onPress={() => {
                                this.props.screenProps.changeLoginState(false)
                            }}
                        >
                            <Text style={accountStyles.ButtonText}
                            >Logout</Text>
                        </Button>
                    </View>

                    <View style={accountStyles.UserContainer}>
                        <View style={accountStyles.UserImage} />
                        <Text style={accountStyles.UserName}>{user.name}</Text>
                    </View>

                    <View style={styles.HR} />

                    <View style={accountStyles.PostsTitleContainer}>
                        <Text style={accountStyles.PostsTitle}>Photos</Text>
                    </View>

                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={user.imagePosts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <React.Fragment>
                                <ListItem
                                    style={{ borderBottomWidth: 0 }}
                                >
                                    <View style={styles.postContainer}>

                                        <View style={styles.postTitleContainer}>
                                            <Text style={styles.postTitleText}>{item.title}</Text>
                                        </View>

                                        <View>
                                            <TouchableHighlight
                                                onPress={() => navigation.navigate('Post', {
                                                    id: item.id,
                                                    user: user.name,
                                                })}
                                            >
                                                <FullWidthImage
                                                    style={styles.postImages}
                                                    source={{ uri: `${endpoint}/${item.image}` }}
                                                />
                                            </TouchableHighlight>
                                        </View>

                                    </View>
                                </ListItem>
                                <View style={styles.HR} />
                            </React.Fragment>
                        )}
                    />

                    <Button
                        onPress={() => {
                            this.props.screenProps.changeLoginState(false);
                        }}
                        title="Sign Out"
                    />
                </View>
            </ScrollView>
        )
    }
}

export default AccountPage;