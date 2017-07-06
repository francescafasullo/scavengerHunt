import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { setUserCurLocation, addItemToBank } from '../reducers/myAccountReducer'
import Camera from 'react-native-camera'
import CameraScreen from './Camera'
import store from '../../store'
const geoFire = require('../../database/firebase.js').geoFire
import styles, { mapStyle } from '../../stylesheet'
import { readItemInfo } from '../../database/firebase'

const {height, width} = Dimensions.get('window')




export default class PlayModeMap extends Component {
  constructor(props) {
    super(props)
    this.updateKeys = this.updateKeys.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.checkTokenDistance = this.checkTokenDistance.bind(this)
    this.findItemFromUserCureMap = this.findItemFromUserCureMap.bind(this)
    this.getItemImage = this.getItemImage.bind(this)
    this.state = {
      latitutde: null,
      longitude: null,
      error: null,
      keys: {},
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      itemImage: ""
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
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  0.00922,
          longitudeDelta: 0.00421
        }
        this.onRegionChange(region, region.latitude, region.longitude);
        if (!this.geoQuery) {
          const gq = this.geoQuery = geoFire.query({
            center: [position.coords.latitude, position.coords.longitude],
            radius: 0.5
          })
          this.geoQuery.on('key_entered', (key, location, distance) => {
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
            radius: 0.5
          })
        }
        this.updateKeys(position)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 500, maximumAge: 1000, distanceFilter: 10 }
    )
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
    this.unsubscribe()
  }

  updateKeys(position) {
      if(Object.keys(this.state.keys).length !== 0) {
        this.setState({keys: withDirectionAndDistance(this.state.keys, position.coords)}, console.log)
      }
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  findItemFromUserCureMap(key){
    let itemOnMap = null
    let itemKeys;
    //checks if there is a current map on the state

    if(this.state.myAccount.map){
      //checks there are items on the map
      if(this.state.myAccount.map.items){
        itemKeys = Object.keys(this.state.myAccount.map.items)
        itemOnMap = itemKeys.filter((item) => {
          return (item === key)
        })
      }
    }
    return itemOnMap

  }

  checkTokenDistance(evt,key){
    const coordinate = {
      'latitude': this.state.keys[key].location[0],
      'longitude': this.state.keys[key].location[1]
    }
    if(!coordinate)
      alert('coordinates were not captured,please try again');
    else
    {
      let distanceFromUser = getDistance(this.state.latitude,this.state.longitude,coordinate.latitude,coordinate.longitude)
      if(distanceFromUser <= 0.1)
      {
        //find the item the user pressed on in the user's map
        let itemOnMap = this.findItemFromUserCureMap(key)
        //if exists - set it as the chosen item in the store
        if(itemOnMap){
          store.dispatch(setUserCurLocation(itemOnMap[0]))
          store.dispatch(addItemToBank(itemOnMap[0])) 
          let image = this.getItemImage(itemOnMap[0])
          image.then(data=> {this.setState({itemImage: data})})
          

        }
        //if not exists - alert the user that he didn't press on any token
        else{
          alert("there is no such location on your map, please get closer to a location on your map")
        }

      }
      else
      {
        alert("you are not close enough to your token...get closer and try again");
      }
    }


  }

  getItemImage(itemKey){
      let itemPromise = readItemInfo(itemKey)
       return itemPromise.then(data=> {
        return data.imagePath
    
      })
    

  }


  render() {
    let curmap,keyExist=true
    const itemKey = (this.state.myAccount ? this.state.myAccount.curItem : null)
    return (

      <View style={styles.container}>
      {itemKey ?
        <View>
        <CameraScreen image={this.state.itemImage}>
        </CameraScreen>
        </View>
        :
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange}
          showsBuildings
        >
        { Object.keys(this.state.keys).length > 0 ? Object.keys(this.state.keys).map((key) => {
          curmap = (this.state.myAccount ? this.state.myAccount.map : null)
          if(curmap){
            if(curmap.items){
              keyExist = curmap.items[key];
            }

          }
          if(keyExist){
          return (

            <MapView.Marker
              coordinate={{latitude: this.state.keys[key].location[0], longitude: this.state.keys[key].location[1]}}
              image={require('../../public/pusheenMarker.png')}
              onPress = {(e) => this.checkTokenDistance(e,key)}
            />


            )
          }
          else{
            return null

          }
          }) : null
        }
        </MapView>

      }
      </View>

    )
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


