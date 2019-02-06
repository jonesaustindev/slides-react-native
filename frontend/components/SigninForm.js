import React, { Component } from 'react';
import { Button } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

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
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </Item>
                <Button
                    title="Sign In"
                    onPress={this.submitForm}
                />
            </Form>
        )
    }
}

export default SigninForm;