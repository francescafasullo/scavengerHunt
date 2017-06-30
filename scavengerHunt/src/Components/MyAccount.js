import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7CAC9',
  },
  points: {
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

export default class MyAccount extends Component {
  constructor(props) {
      super(props)
  }

  render() {
      return (
          <View style={styles.container}>
						<Text style={styles.points}>
						You have points!
						</Text>
						<Button title="Settings"/>
						<Button title=""/>
						<Button title=""/>
          </View>
      )
  }
}
