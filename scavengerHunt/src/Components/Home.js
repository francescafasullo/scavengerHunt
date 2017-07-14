import React, { Component } from 'react'
import { Navigator, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native'
import firebase from 'firebase'
import styles from '../../stylesheet'

/*
Home component represents the first page that is loaded
when a user opens the app. it displays a picture and a name
*/

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
      <View style={styles.welcome_container}>
        <Image source={require('../../public/appIcon.png')} />
        <Text style={styles.welcome}>
          Welcome to Pusheen Travel!
        </Text>
      </View>

    );
  }
}
