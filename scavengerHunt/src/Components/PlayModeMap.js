import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
const geoFire = require('../../database/firebase.js').geoFire

const {height, width} = Dimensions.get('window')
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
     margin: 10,
  },
  map: {
    width: width,
    height: height,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BFD8D2'
  }
})

export default class PlayModeMap extends Component {
  constructor(props) {
    super(props)
    this.updateKeys = this.updateKeys.bind(this)
    this.state = {
      latitutde: null,
      longitude: null,
      error: null,
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
            radius: 0.5
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
            radius: 0.5
          })
        }
        this.updateKeys(position)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 500, maximumAge: 1000, distanceFilter: 10 }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  updateKeys(position) {
      if(Object.keys(this.state.keys).length !== 0) {
        console.log('keys !!!!!!', this.state.keys)
        this.setState({keys: withDirectionAndDistance(this.state.keys, position.coords)}, console.log)
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude || 40.7050758,
            longitude: this.state.longitude || -74.00916039999998,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          showsBuildings={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        >
        { Object.keys(this.state.keys).length > 0 ? Object.keys(this.state.keys).map((key) => {
          return (
            <Marker
              location={this.state.keys[key].location}
            />
          )
        }) : null
        }
        </MapView>
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
