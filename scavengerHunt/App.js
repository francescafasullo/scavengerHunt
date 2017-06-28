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
import database from './database/firebase'
import SignUpScreen from './src/Components/SignUp'
import LoginScreen from './src/Components/Login'
import MyAccountScreen from './src/Components/MyAccount'

 
const scavengerHuntRouter = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Welcome to Scavenger Hunt!'
    }
  },
  Camera: {
    screen: CameraScreen
  }, 
  SignUp: {
    screen: SignUpScreen
  },
  Login: {
    screen: LoginScreen
  },
  MyAccount: {
    screen: MyAccountScreen
  }
})


AppRegistry.registerComponent('scavengerHunt', () => scavengerHuntRouter);
