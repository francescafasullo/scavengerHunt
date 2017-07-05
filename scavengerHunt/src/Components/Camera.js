import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, Button} from 'react-native'
import Camera from 'react-native-camera'
import styles from '../../stylesheet' 
import store from '../../store'
import { setUserCurLocation,takeItemOfMap } from '../reducers/myAccountReducer'
import * as Animatable from 'react-native-animatable'

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
    this.TakeOfItemAndNavigateBack=this.TakeOfItemAndNavigateBack.bind(this)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      distance: null,
      closestPlaceLat: null,
      closestPlaceLong: null
    }
    this.state.store = store.getState()
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
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
    this.unsubscribe()
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

  

  TakeOfItemAndNavigateBack(){
    store.dispatch(setUserCurLocation(""))
    store.dispatch(takeItemOfMap(this.state.store.myAccount.curItem))
    
}


  render() {
    return (
      <View style={styles.container}>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
           >

          <View style={styles.arDisplay}>
            <Animatable.Image
                animation="slideInDown"
                iterationCount={10}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/pusheenSunglasses.png')}
                resizeMode="contain"
              > 
              </Animatable.Image>
              <Animatable.Text
              animation="slideInDown"
              iterationCount={10}
              direction="alternate"
              >
              You Have Collected a Pusheen
            </Animatable.Text>
          </View>
          <Button style={styles.capture} onPress={this.takePicture} title="CAPTURE"/>
          <Button style={styles.capture} onPress={this.TakeOfItemAndNavigateBack} title="MAP"/>
        </Camera>
      </View>
    );
  }
  
}


