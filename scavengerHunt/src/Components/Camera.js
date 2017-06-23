import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import Camera from 'react-native-camera'

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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  overlay: {
    justifyContent: 'center',
    top: 100,
    left: 100,
    width: 200,
    height: 100
  },
  arDisplay: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1
  }
});

export default class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
  }

  takePicture() {
    this.camera.capture()
      .then(data => console.log(data))
      .catch(err => console.trace(err))
  }

  render() {
    console.log('in camera play!!!!!!!!!!!!!!!!!!!!!!!')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} >
          <View style={styles.arDisplay}>
            <Image
              style={styles.overlay}
              source={require('../../public/pusheenSunglasses.png')}
              resizeMode='contain'
            />
          </View>
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

AppRegistry.registerComponent('scavengerHunt', () => CameraScreen);
