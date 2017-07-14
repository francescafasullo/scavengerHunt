import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, Button, TouchableHighlight} from 'react-native'
import Camera from 'react-native-camera'
import styles from '../../stylesheet'
import store from '../../store'
import { setUserCurLocation,takeItemOfMap } from '../reducers/myAccountReducer'
import * as Animatable from 'react-native-animatable'


/*
camera class handles the camera page. this page is loaded to the app
when the user reaches a place on their scavenger hunt and clicks the image-token
If the user is close enough to the place the camera will open and the user can take a picture of the place
*/
export default class CameraScreen extends Component {
  constructor(props) {
    super(props)

    //binding class methods 
    this.takePicture = this.takePicture.bind(this)
    this.getDistance = this.getDistance.bind(this)
    this.TakeOfItemAndNavigateBack=this.TakeOfItemAndNavigateBack.bind(this)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      distance: null,
      closestPlaceLat: null,
      closestPlaceLong: null,
      itemImage: ""
    }
    this.state.store = store.getState()
  }

  //when component is redered initializes the watchId 
  //also subscribes to the redux store 
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

  //prior rendering, clear watchId and unsubscribe to the store
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
    this.unsubscribe()
  }

  //taking a picture functionality
  takePicture() {
    this.camera.capture()
      .then(data => console.log(data))
      .catch(err => console.trace(err))
  }

  //calculating the distance between 2 coordinates
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


  //when the use is done taking a picture and wantes to go back to the 
  //scavenger hunt map, they click on "map" button that triggers this function
  //that takes the token-image off the map
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
          aspect={Camera.constants.Aspect.fill}>


          <View style={styles.arDisplay}>
          <View>
          {pickAnimatableImage(this.props.image)}

          </View>
          <View style={styles.view_no_background}>
          <Text
          style={styles.arText}
          >
          You Have Collected {"\n"}a Pusheen
          </Text>
          </View>
          </View>
          <View style={styles.camera_buttons_view}>
          <View style={styles.capture}>
          <Button color={'black'}  style={styles.camera_button} onPress={this.takePicture} title="CAPTURE" />
          </View>
          <View style={styles.capture}>
          <Button color={'black'} style={styles.camera_button} onPress={this.TakeOfItemAndNavigateBack} title="MAP"/>
          </View>
          </View>
        </Camera>
      </View>
    );
  }

}

//a function that converts input image path to am AnimatableImage with that path
export const pickAnimatableImage = (imagePath) => {
    switch(imagePath) {
      case '../../public/djPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/djPusheen.png')}
                resizeMode="contain">
              </Animatable.Image>
        )
        break
      case '../../public/iceCreamPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/iceCreamPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/laptopPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/laptopPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/mermaidPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/mermaidPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/museumPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/museumPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/noodlePusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/noodlePusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/pusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/pusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/pusheenSunglasses.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/pusheenSunglasses.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/restaurantPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/restaurantPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/scooterPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/scooterPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
      case '../../public/unicornPusheen.png':
        return (
          <Animatable.Image
                animation="slideInDown"
                iterationCount={30}
                direction="alternate"
                style={styles.overlay}
                source={require('../../public/unicornPusheen.png')}
                resizeMode="contain">
           </Animatable.Image>
        )
        break
    }
  }

