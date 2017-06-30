import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import Camera from 'react-native-camera'
const geoFire = require('../../database/firebase.js').geoFire

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
    this.getDistance = this.getDistance.bind(this)
    this.getDirection = this.getDirection.bind(this)
    this.updateKeys = this.updateKeys.bind(this)
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
          const gq = this.geoQuery = geoFire.query({
            center: [position.coords.latitude, position.coords.longitude],
            radius: 0.1
          })
          this.geoQuery.on('key_entered', (key, location, distance) => {
            console.log('these are keys', this.state.keys)
            const keys = {...this.state.keys, [key]: {location}}
            this.setState({keys: withDirectionAndDistance(keys, position.coords)}, console.log)
          })
          this.geoQuery.on('key_exited', (key, location, distance) => {
            const keys = Object.assign({}, this.state.keys)
            delete keys[key]
            this.setState({keys: withDirectionAndDistance(keys, position.coords)}, console.log)
          })
        } else {
          this.geoQuery.updateCriteria({
            center: [position.coords.latitude, position.coords.longitude],
            radius: 0.1
          })
        }
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
          <View style={styles.arDisplay, width: }>
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



function getDistance(lat1, lon1, lat2, lon2) {
  const deg2rad = function(deg) {
    return deg * (Math.PI / 180)
  }
  var radius = 6371
  var dlat = deg2rad(lat2 - lat1)
  var dlon = deg2rad(lon2 - lon1)
  var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dlon / 2) * Math.sin(dlon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = radius * c
  return d
}

function getDirection(lat1, lon1, lat2, lon2) {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180
  }
  var a = Math.sin(lon2.toRad() - lon1.toRad()) * Math.cos(lat2.toRad())
  var b = Math.cos(lat1.toRad()) * Math.sin(lat2.toRad()) - Math.sin(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.cos(lon2.toRad() - lon1.toRad())
  return Math.atan2(a, b) * 180 / Math.PI
}

function withDirectionAndDistance(places, coords) {
  return Object.keys(places)
    .map(key => [key, placeWithDirectionAndDistance(places[key], coords)])
    .reduce((obj, [key, value]) => ({
        ...obj,
        [key]: value
    }), {})
  // let keys = places

  // for (var key in places) {
  //   console.log('key in updateKeys****************', key)
  //   keys = {
  //     ...keys,
  //     [key]: {
  //       ...this.state.keys[key],
  //       direction: this.getDirection(latitude, this.state.longitude,
  //                                    this.state.keys[key].location[0],
  //                                    this.state.keys[key].location[1]),
  //       distance: this.getDistance(latitude, this.state.longitude,
  //                                  this.state.keys[key].location[0],
  //                                  this.state.keys[key].location[1]),
  //     }
  //   })
  // }
  // return keys
}

function placeWithDirectionAndDistance(place, {latitude, longitude}) {
  const [placeLat, placeLng] = place.location
  return {
    ...place,
    direction: getDirection(latitude, longitude,
                            placeLat, placeLng),
    distance: getDistance(latitude, longitude,
                          placeLat, placeLng),
  }
}
