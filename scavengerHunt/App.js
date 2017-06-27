/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

console.log('in App.js***********************')

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import HomeScreen from './src/Components/Home'
import CameraScreen from './src/Components/Camera'
const fireBase = require('./database/firebase');

 
const scavengerHuntRouter = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Welcome to Scavenger Hunt!'
    }
  },
  Camera: {
    screen: CameraScreen
  }
})


AppRegistry.registerComponent('scavengerHunt', () => scavengerHuntRouter);
