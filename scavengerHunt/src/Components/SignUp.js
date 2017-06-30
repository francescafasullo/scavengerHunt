import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableHighlight, Button } from 'react-native'
import firebase from 'firebase'


const styles = StyleSheet.create({

})

export default class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
		//this.updateFirstName = this.updateFirstName.bind(this)
		this.updateLastName = this.updateLastName.bind(this)
		this.updateEmail = this.updateEmail.bind(this)
		this.updatePassword = this.updatePassword.bind(this)
	}

	// updateFirstName = (text) => {
	//     this.setSate({firstName: text})
	// }

	updateLastName = (text) => {
		this.setState({ lastName: text })
	}

	updateEmail = (text) => {
		this.setState({ email: text })
	}

	updatePassword = (text) => {
		this.setState({ password: text })
	}

	login = (email, password) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
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
				placeholder="First Name"
				onChangeText={this.updateFirstName}
			/>
			<TextInput
				style={{ height: 40 }}
				placeholder="Last Name"
				onChangeText={this.updateLastName}
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
				onPress={() => this.login(this.state.email, this.state.password)}
				title="Sign Up" />
		</View>
	)
}

}
