import React, { Component } from 'react';
import { View, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

import styles from '../styles/signupStyles';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }
    submitForm = () => {
        const { name, email, password } = this.state;
        this.props.onSubmit({
            name,
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
                        <Text style={styles.Text}>Welcome to</Text>
                        <Text style={styles.BigText}>Slides</Text>
                    </View>
                    <Item floatingLabel>
                        <Label>Name</Label>
                        <Input
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />
                    </Item>
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
                            <Text style={styles.ButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Form>
            </KeyboardAvoidingView>
        )
    }
}

export default SignupForm;