import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import Camera from 'react-native-camera'
import { geoFire } from '../../database/firebase.js'

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
    this.getDistance = this.getDistance.bind(this)
    this.getDirection = this.getDirection.bind(this)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      distance: null,
      closestPlaceLat: null,
      closestPlaceLong: null,
      keys: {}
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
        if (!this.geoQuery) {
          console.log('makinga geoQuery boiiii')
          this.geoQuery = geoFire.query({
            center: [position.coords.latitude, position.coords.longitude],
            radius: 0.09
          })
        } else {
          this.geoQuery.on('key_entered', (key, location, distance) => {
            const keys = Object.assign({}, this.state.keys, {[key]: true})
            this.setState({keys}, console.log)
            console.log('entering', this.state.keys)
          })
          this.geoQuery.on('key_exited', (key, location, distance) => {
            const keys = Object.assign({}, this.state.keys)
            delete keys[key]
            this.setState({keys}, console.log)
            console.log('exiting', this.state.keys)
          })
          this.geoQuery.updateCriteria({
            center: [position.coords.latitude, position.coords.longitude],
            radius: 0.09
          })
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000, distanceFilter: 10 }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
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

  getDirection(lat1, lon1, lat2, lon2) {
  Number.prototype.toRad = function() {
      return this * Math.PI / 180
    }
      var a = Math.sin(lon2.toRad() - lon1.toRad()) * Math.cos(lat2.toRad());
      var b = Math.cos(lat1.toRad()) * Math.sin(lat2.toRad()) -
            Math.sin(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.cos(lon2.toRad() - lon1.toRad());
      return Math.atan2(a, b) * 180 / Math.PI;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Latitude: {this.state.latitude}</Text>
        <Text style={styles.welcome}>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Text style={styles.welcome}>{this.string}</Text>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} >
          <View style={styles.arDisplay}>
            { this.state.keys ? Object.keys(this.state.keys).map(key => {
              const lat1 = this.state.latitude
              const lon1 = this.state.longitude
              const lat2 = key.l[0]
              const lon2 = key.l[1]
              const direction = this.getDirection(lat1, lon1, lat2, lon2)
              const distance = this.getDistance(lat1, lon1, lat2, lon2)
              return (
                <View>
                  <Text>{direction}</Text>
                  <Image
                    style={styles.overlay}
                    source={require('../../public/pusheenSunglasses.png')}
                    resizeMode='contain'
                    />
                </View>
                )
              }) : null
            }
          </View>
        </Camera>
      </View>
    );
  }
}

AppRegistry.registerComponent('scavengerHunt', () => CameraScreen);
