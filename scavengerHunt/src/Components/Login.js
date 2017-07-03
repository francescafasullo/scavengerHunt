import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native'
import firebase from 'firebase'
import store from '../../store'
import {login} from '../reducers/authReducer'

const styles = StyleSheet.create({})

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }

        this.loginAndNavigate = this.loginAndNavigate.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
    }

    loginAndNavigate = (email, password) => {
        store.dispatch(login(email, password));
        this.props.navigation.navigate('MyAccount')
    }

    updateEmail = (text) => {
        this.setState({email: text});
    }

    updatePassword = (text) => {
        this.setState({password: text});
    }

    componentDidMount () {
      this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState());
      });
    }

    componentWillUnmount () {
      this.unsubscribe();
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
                    onPress={() => this.loginAndNavigate(this.state.email, this.state.password)}
                    title="Login"
                />
            </View>
        )
    }
}

//AppRegistry.registerComponent('scavengerHunt', () => LoginScreen)

