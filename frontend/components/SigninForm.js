import React, { Component } from 'react';
import { TouchableOpacity, View, Text, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

import styles from '../styles/signupStyles';

class SigninForm extends Component {
    state = {
        email: '',
        password: '',
    }
    submitForm = () => {
        const { email, password } = this.state;
        this.props.onSubmit({
            email: email.toLowerCase(),
            password
        });
    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.Container}
                behavior='padding'
            >
                <Form style={styles.FormContainer}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.Text}>Welcome back to</Text>
                        <Text style={styles.BigText}>Slides</Text>
                    </View>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            autoCapitalize="none"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </Item>
                    <View style={styles.SubmitButtonContainer}>
                        <TouchableOpacity
                            style={styles.SubmitButton}
                            onPress={this.submitForm}
                        >
                            <Text style={styles.ButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Form>
            </KeyboardAvoidingView>
        )
    }
}

export default SigninForm;