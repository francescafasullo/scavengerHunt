import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

const {height, width} = Dimensions.get('window')
const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    width: 300,
    alignSelf: 'center'
  },
  map: {
    width: 500,
    height: 500,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BFD8D2'
  },
})

export default class EditMapItems extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateDescription(text) {
    this.setState({ mapName: text })
  }

  updateMapName(text) {
    this.setState({ description: text })
  }


  addMarker(evt) {
    const { coordinate } = evt.nativeEvent
    this.setState({
      places: [
        ...this.state.places, {
          coordinate, title: 'Find Pusheen!', description: 'Pusheen has been dropped at this location.',
        }]
    })
  }

  clear() {
    this.setState({ places: [] })
  }

  render() {
    const userId = (this.state ? this.state.auth.userId : null)
    return (
      <View style={styles.container}>
        <Text>Add a marker by clicking on the map or searching for a place!</Text>
        <Button onPress={() => {
          this.saveSH(this.state.mapName, this.state.description, userId)
          this.props.navigation.navigate('SavedConf')
        }}
          title="Save Scavenger Hunt" />
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details) => {
            console.log(data)
            console.log(details)
          }}
          getDefaultValue={() => {
            return ''
          }}
          query={{
            key: 'AIzaSyCBdYszOawkF36kzWxlISNdL4pWVfKvY8g',
            language: 'en'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            }
          }}

          currentLocation={true}
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch'
        />
        <Button onPress={this.clear} title="Clear all markers" />
        <MapView
          provider={PROVIDER_GOOGLE}
          onPress={this.addMarker}
          style={styles.map}
          initialRegion={{
            latitude: 40.759025,
            longitude: -73.985185,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}>
          {
            (this.state.places || []).map(
              place =>
                <MapView.Marker
                  coordinate={place.coordinate}
                  title={place.title}
                  description={place.description}
                />
            )
          }
        </MapView>
      </View>
    )
  }
}
