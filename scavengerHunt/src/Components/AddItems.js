import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
import { newMap, setUserSelectedMap, newItem, fetchCurrentMapItems } from '../reducers/myAccountReducer'

const {height, width} = Dimensions.get('window')

const pusheenImages = [
{name: 'DJ Pusheen', imagePath: '../../public/djPusheen.png'},
{name: 'Ice Cream Pusheen', imagePath: '../../public/iceCreamPusheen.png'},
{name: 'Laptop Pusheen', imagePath: '../../public/laptopPusheen.png'},
{name: 'Mermaid Pusheen', imagePath: '../../public/mermaidPusheen.png'},
{name: 'Fancy Pusheen', imagePath: '../../public/museumPusheen.png'},
{name: 'Noodle Pusheen', imagePath: '../../public/noodlePusheen.png'},
{name: 'Plain Pusheen', imagePath: '../../public/pusheen.png'},
{name: 'Sunglasses Pusheen', imagePath: '../../public/pusheenSunglasses.png'},
{name: 'Chef Pusheen', imagePath: '../../public/restaurantPusheen.png'},
{name: 'Scooter Pusheen', imagePath: '../../public/scooterPusheen.png'},
{name: 'Unicorn Pusheen', imagePath: '../../public/unicornPusheen.png'}
]

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
    width: width,
    height: 500,
    alignSelf: 'center',
  },
  image: {
    width: 200
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BFD8D2'
  },
})

export default class AddItems extends Component {
  constructor(props) {
    super(props)
    userId = store.getState().auth.userId
    user = store.getState().myAccount
    this.addMarker = this.addMarker.bind(this)
    this.clear = this.clear.bind(this)
    this.addPinToPlaces = this.addPinToPlaces.bind(this)
    this.updatePinName = this.updatePinName.bind(this)
    this.updatePinDescription = this.updatePinDescription.bind(this)
    this.savePlacesToSH = this.savePlacesToSH.bind(this)
    this.pickImage = this.pickImage.bind(this)
    this.getMapItems = this.getMapItems.bind(this)
    this.state = {
      user: user,
      places: [],
      mapName: '',
      description: '',
      mapRegion: {
        latitude: 40.7128,
        longitude: -74.0059,
        latitudeDelta:  40,
        longitudeDelta: 40
      },
      lastLat: null,
      lastLong: null,
      location: '',
      userId: userId,
      selectedPlace: {},
      selectedImage: pusheenImages[6]
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
    this.getMapItems(this.state.user.map.key)
  }

  getMapItems(mapId) {
    store.dispatch(fetchCurrentMapItems(mapId))
  }

  addMarker(evt) {
    const { coordinate } = evt.nativeEvent
    this.setState({
      selectedPlace: {
          coordinate, title: 'Find Pusheen!', description: 'Pusheen has been dropped at this location.'
        }
    })
  }

  addPinToPlaces() {
    let pins = this.state.places.slice()
    pins.push(this.state.selectedPlace)
    this.setState({ places: pins, selectedPlace: {} })
  }

  updatePinDescription(text) {
    let update = Object.assign({}, this.state.selectedPlace)
    update.description = text
    this.setState({ selectedPlace: update })
  }

  updatePinName(text) {
    let update = Object.assign({}, this.state.selectedPlace)
    update.name = text
    this.setState({ selectedPlace: update })
  }

  savePlacesToSH(places) {
    places.map((place) => {
      return store.dispatch(newItem(place.name, place.description, place.coordinate.latitude, place.coordinate.longitude, place.imagePath, this.state.user.map.key))
    })
  }

  clear() {
    this.setState({ places: [] })
  }

  pickImage(imagePath) {
    switch(imagePath) {
      case '../../public/djPusheen.png':
        return (
          <Image
            source={require('../../public/djPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/iceCreamPusheen.png':
        return (
          <Image
            source={require('../../public/iceCreamPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/laptopPusheen.png':
        return (
          <Image
            source={require('../../public/laptopPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/mermaidPusheen.png':
        return (
          <Image
            source={require('../../public/mermaidPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/museumPusheen.png':
        return (
          <Image
            source={require('../../public/museumPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/noodlePusheen.png':
        return (
          <Image
            source={require('../../public/noodlePusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/pusheen.png':
        return (
          <Image
            source={require('../../public/pusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/pusheenSunglasses.png':
        return (
          <Image
            source={require('../../public/pusheenSunglasses.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/restaurantPusheen.png':
        return (
          <Image
            source={require('../../public/restaurantPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/scooterPusheen.png':
        return (
          <Image
            source={require('../../public/scooterPusheen.png')}
            style={styles.image}
          />
        )
        break
      case '../../public/unicornPusheen.png':
        return (
          <Image
            source={require('../../public/unicornPusheen.png')}
            style={styles.image}
          />
        )
        break
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
        >
          <View>
          {
            this.state.selectedPlace.title ?
                <View>
                  <Text>Specify a name, description, and Pusheen for your pin!</Text>
                  <TextInput
                    style={{ height: 40 }}
                    placeholder="Pin Name"
                    onChangeText={this.updatePinName}
                  />
                  <TextInput
                    style={{ height: 40 }}
                    placeholder="Pin Description"
                    onChangeText={this.updatePinDescription}
                  />
                  { this.state.selectedImage.imagePath ?
                    <Text>Selected Pusheen: {this.state.selectedImage.name}</Text>
                  : null }
                  <Button onPress={() => this.addPinToPlaces(this.state.selectedPlace)} title="Save Pin" />
                  <Picker
                    onValueChange={(value, index) => {
                      this.setState({selectedImage: pusheenImages[index]})
                      console.log('!!!!!!!!!!!', this.state.selectedImage)
                      let selectedPlaceholder = Object.assign({}, this.state.selectedPlace)
                      selectedPlaceholder.imagePath = this.state.selectedImage.imagePath
                      this.setState({ selectedPlace: selectedPlaceholder})
                      }
                    }
                    >
                    { pusheenImages.map((image, index) => {
                      return (
                        <Picker.Item key={index} label={image.name} value={image.name} />
                        )
                    }) }
                  </Picker>
                  { this.state.selectedImage.name ? this.pickImage(this.state.selectedImage.imagePath) : null }
                </View> :
                <View>
                  <Text>Click a place on the map to add a pin!:</Text>
                  <Button onPress={() => {
                    this.savePlacesToSH(this.state.places)
                  }}
                    title="Save Places" />
                </View>
          }
          <MapView
            fitToElements
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.mapRegion}
            onPress={this.addMarker}
            showsBuildings
          >
            {
              this.state.selectedPlace.title ?
                <MapView.Marker
                   coordinate={this.state.selectedPlace.coordinate}
                   title={this.state.selectedPlace.title}
                   description={this.state.selectedPlace.description}
                 />
              : this.state.places.length > 0 ? this.state.places.map(
               place =>
                 <MapView.Marker
                   coordinate={place.coordinate}
                   title={place.title}
                   description={place.description}
                   onPress={this.markerDescription}
                 />
             ) : null
           }
           {
              this.state.user.items.length > 0 && !this.state.selectedPlace.title ? this.state.user.items.map((item) => {
                return (
                  <MapView.Marker
                   coordinate={{latitude: item.latitude, longitude: item.longitude}}
                   title={item.title}
                   description={item.description}
                   onPress={this.markerDescription}
                  />
                )
              })
            : null }
          </MapView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
