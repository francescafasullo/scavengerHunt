import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';
import styles from '../../stylesheet'

export default class SignInSignUp extends Component {
	constructor(props) {
		super(props)

	}

	render(){
		return (
		  <View style={styles.container}>
	        <Text style={styles.welcome}>
	          Sign In or Sign Up
	        </Text>
	        <Button onPress={() => { this.props.navigation.navigate('SignUp') }} title="Sign Up" />
	        <Button onPress={() => {this.props.navigation.navigate('Login')}}
	        title="Login"/>
		 </View>
	);

	}
}

//AppRegistry.registerComponent('scavengerHunt', () => SignInSignUp);



