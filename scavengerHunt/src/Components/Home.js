import React, { Component } from 'react'
import { Navigator, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native'
import firebase from 'firebase'

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

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Scavenger Hunt!
        </Text>
<<<<<<< HEAD
        <Button onPress={() => { this.props.navigation.navigate('Camera') }} title="Play!" />
=======

        <Button onPress={() => {this.props.navigation.navigate('UserSH')}} title="Check out your map!" />

        <Button onPress={() => { this.props.navigation.navigate('PlayMap') }} title="Play!" />
        <Button title="Explore"/>
>>>>>>> on press markers
        <Button onPress={() => { this.props.navigation.navigate('SignUp') }} title="Sign Up" />
        <Button onPress={() => { this.props.navigation.navigate('Login') }}
          title="Login" />
        <Button onPress={this.logout} title="Logout" />
        <Button onPress={() => { this.props.navigation.navigate('Explore') }}
          title="Explore"
           />
        <Button onPress={() => {this.props.navigation.navigate('PlayMap')}} title="Check out your map!" />
      </View>

    );
  }
}

AppRegistry.registerComponent('scavengerHunt', () => HomeScreen);
