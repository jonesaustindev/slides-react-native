import React, { Component } from 'react';
import { Button } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }
    submitForm = () => {
        const { name, email, password } = this.state;
        this.props.onSubmit({
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password
        });
    }
    render() {
        return (
            <Form>
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
                <Button
                    title="Sign Up"
                    onPress={this.submitForm}
                />
            </Form>
        )
    }
}

export default SignupForm;