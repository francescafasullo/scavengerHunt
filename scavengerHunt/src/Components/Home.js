import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

console.log('page loaded')

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('rendering')
    return (
      <View >
        <Text >
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('scavengerHunt', () => HomeScreen);
