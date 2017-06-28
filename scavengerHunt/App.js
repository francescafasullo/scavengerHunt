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
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeScreen from './src/Components/Home'
import CameraScreen from './src/Components/Camera'
 import database from './database/firebase'

 
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

  }
},{
  tabBarOptions: {
    activeTintColor: '#696969',
    inactiveTintColor: '#C0C0C0'
  }
})

//AppRegistry.registerComponent('scavengerHunt', () => scavengerHuntRouter);
AppRegistry.registerComponent('scavengerHunt', () => Tabs);



/*
Play: {
    screen: CameraScreen,
    navigationOptions: {
      tabBar:{
        label: 'Play',
        icon: ({ color }) => <Icon class="material-icons" name="play" size={35} color={color}/>
      }  
        
    }
    <i class="material-icons">play_circle_filled</i>

  }
*/