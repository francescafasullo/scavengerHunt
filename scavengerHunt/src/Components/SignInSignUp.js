import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Button

} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7CAC9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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

AppRegistry.registerComponent('scavengerHunt', () => SignInSignUp);



