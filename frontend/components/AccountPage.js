import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class AccountPage extends Component {
    render() {
        const user = this.props.user;
        return (
            <View>
                <Text>{user.name}</Text>
                <Button
                    onPress={() => {
                        this.props.screenProps.changeLoginState(false);
                    }}
                    title="Sign Out"
                />
            </View>
        )
    }
}

export default AccountPage;