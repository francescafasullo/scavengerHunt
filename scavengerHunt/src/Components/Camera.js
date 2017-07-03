import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import Camera from 'react-native-camera'
import styles from '../../stylesheet' 

export default class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
    this.getDistance = this.getDistance.bind(this)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      distance: null,
      closestPlaceLat: null,
      closestPlaceLong: null
    }
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          closestPlaceLat: 40.7052066,
          closestPlaceLong: -74.01032889999999
        })
        this.getDistance(this.state.latitude, this.state.longitude, this.state.closestPlaceLat, this.state.closestPlaceLong)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  takePicture() {
    this.camera.capture()
      .then(data => console.log(data))
      .catch(err => console.trace(err))
  }

  getDistance(lat1, lon1, lat2, lon2) {
    const deg2rad = function(deg) {
      return deg * (Math.PI / 180)
    }
    var radius = 6371
    var dlat = deg2rad(lat2 - lat1)
    var dlon = deg2rad(lon2 - lon1)
    var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dlon / 2) * Math.sin(dlon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = radius * c
    this.setState({distance: d})
    return d
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Latitude: {this.state.latitude}</Text>
        <Text style={styles.welcome}>Longitude: {this.state.longitude}</Text>
        <Text style={styles.welcome}>Distance to Open Market: {this.state.distance}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} >
          <View style={styles.arDisplay}>
            { this.state.distance < 0.1 ?
              <Image
                style={styles.overlay}
                source={require('../../public/pusheenSunglasses.png')}
                resizeMode="contain"
              /> : <Image
                style={styles.overlay}
                source={require('../../public/pusheen.png')}
                resizeMode="contain"
              />
            }
          </View>
          <Text style={styles.capture} onPress={this.takePicture}>CAPTURE</Text>
        </Camera>
      </View>
    );
  }
}

//AppRegistry.registerComponent('scavengerHunt', () => CameraScreen);
