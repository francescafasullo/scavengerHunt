import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableHighlight } from 'react-native'
import firebase from 'firebase'
import store from '../../store'
import {signUp} from '../reducers/authReducer'
import {Button} from 'react-native-elements'
import styles from '../../stylesheet'


/*
signup component represents the sign up page
where the user sets an email and password
*/
export default class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: "",
			email: "",
			password: ""
		}
		
		
		this.updateUserName = this.updateUserName.bind(this)
		this.updateEmail = this.updateEmail.bind(this)
		this.updatePassword = this.updatePassword.bind(this)
	}

	

	updateUserName = (text) => {
		this.setState({ userName: text })
	}

	updateEmail = (text) => {
		this.setState({ email: text })
	}

	updatePassword = (text) => {
		this.setState({ password: text })
	}

	signUpAndNavigate = (userName, email, password) => {
		store.dispatch(signUp(userName, email, password));
		this.props.navigation.navigate('MyAccount')
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
				placeholder="User Name"
				onChangeText={this.updateUserName}
			/>
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
				buttonStyle={styles.myAccount_button}
				onPress={() => this.signUpAndNavigate(this.state.userName,this.state.email, this.state.password)}
				title="Sign Up" />
		</View>
	)
}

}



