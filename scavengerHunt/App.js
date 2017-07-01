import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeScreen from './src/Components/Home'
import CameraScreen from './src/Components/Camera'
import SignInSignUpScreen from './src/Components/SignInSignUp'

const fireBase = require('./database/firebase');

import SignUpScreen from './src/Components/SignUp'
import LoginScreen from './src/Components/Login'
import MyAccountScreen from './src/Components/MyAccount'
import PlayModeMap from './src/Components/PlayModeMap'


const scavengerHuntRouter = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Welcome to Scavenger Hunt!'
    }
  },
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      title: 'Play'
    }
  },
  SignUp: {
    screen: SignUpScreen
  },
  Login: {
    screen: LoginScreen
  },
  MyAccount: {
    screen: MyAccountScreen

  },
  SignInSignUp: {
    screen: SignInSignUpScreen
  },
  PlayModeMap: {
    screen: PlayModeMap
  }
})

 const Tabs = TabNavigator({
  Home: {
    screen: scavengerHuntRouter,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) =>  <Icon name="home" size={26} color={tintColor} />

    }

  },
  Play: {
    screen: CameraScreen,
    navigationOptions: {
      tabBarLabel: 'Play',
      tabBarIcon: ({ tintColor }) => <Icon name="play-circle-filled" size={26} color={tintColor} />

    }

  },
  Account: {
    screen: MyAccountScreen,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={26} color={tintColor} />

    }

  }
},{
  tabBarOptions: {
    activeTintColor: '#800000',
    inactiveTintColor: '#696969'
  }
})

AppRegistry.registerComponent('scavengerHunt', () => Tabs);
