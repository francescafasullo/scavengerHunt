import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native'
import firebase from 'firebase'

const styles = StyleSheet.create({})

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.login = this.login.bind(this)
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        this.props.navigation.navigate('MyAccount')
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Email"
                    onChangeText={this.updateEmail}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Password"
                    onChangeText={this.updatePassword}
                />
                <Button
                    onPress={() => this.login(this.state.email, this.state.password)}
                    title="Login"
                />
            </View>
        )
    }
}
