import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator} from 'react-native';
import {Button} from 'react-native-elements'
import styles from '../../stylesheet'

export default class SignInSignUp extends Component {
	constructor(props) {
		super(props)

	}

	render(){
		return (
		  <View style={styles.myAccount_container}>
	        <Text style={styles.myAccount_title}>
	          Sign In or Sign Up
	        </Text>
	        <Button buttonStyle={styles.myAccount_button} onPress={() => { this.props.navigation.navigate('SignUp') }} title="Sign Up" />
	        <Button buttonStyle={styles.myAccount_button} onPress={() => {this.props.navigation.navigate('Login')}}
	        title="Login"/>
		 </View>
	);

	}
}




