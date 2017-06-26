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
    this.getDistanceFromLatLonInKm = this.getDistanceFromLatLonInKm.bind(this)
    this.deg2rad = this.deg2rad.bind(this)
    this.state = {
      latitude: null,
      longitude: null,
      error: null
    }
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
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

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var radius = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1)  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = radius * c; // Distance in km
    return d;
}

  deg2rad(deg) {
    return deg * (Math.PI / 180)
}

  render() {
    console.log('in camera play!!!!!!!!!!!!!!!!!!!!!!!')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Latitude: {this.state.latitude}</Text>
        <Text style={styles.welcome}>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} >
          <View style={styles.arDisplay}>
            {
              <Image
                style={styles.overlay}
                source={require('../../public/pusheenSunglasses.png')}
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

AppRegistry.registerComponent('scavengerHunt', () => CameraScreen);
