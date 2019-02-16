import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Fab, Icon } from 'native-base';

import navStyles from '../styles/navStyles';
import Posts from '../screens/Posts';
import { signOut } from '../auth';


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
                <Button 
                    onPress={() => {
                        signOut();
                        this.props.client.resetStore();
                    }}
                    title="Sign Out"
                />
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

export default Home;