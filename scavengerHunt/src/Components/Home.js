import React, { Component } from 'react'
import { Navigator, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native'
import firebase from 'firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCF1E3',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#FFB100'
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
        <Image source={require('../../public/appIcon.png')} />
        <Text style={styles.welcome}>
          Welcome to Pusheen Travel!
        </Text>
        <Button color={'black'} onPress={() => {this.props.navigation.navigate('Explore')}}title="Explore" />
      </View>

    );
  }
}
