import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, Picker, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
import axios from 'axios'
// import styles from '../../stylesheet'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFD8D2'
  },
  text: {
    margin: 20
  },
  subtext: {
    margin: 10
  },
  map: {
    width: width,
    height: 500,
    alignSelf: 'center',
  },
});

export default class Explore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      attractions: [],
      latitude: "",
      longitude: "",
      choice: ""
    }
  }

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 2,
          longitudeDelta: 0.00421 * 2
        }
        this.setState({ latitude: region.latitude, longitude: region.longitude })
        this.onRegionChange(region, region.latitude, region.longitude)
      }
    )




  }

  onRegionChange = (region, lastLat, lastLong) => {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  showRestaurants = () => {
    axios.get(`https://api.tripexpert.com/v1/venues?api_key=44871cd75dea94cd486fba9b00171eb6&venue_type_id=2&order_by=distance&latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
      .then(res => {
        this.setState({ restaurants: res.data.response.venues })
      }).catch(error => {
        console.log(error)
      })
    this.setState({ choice: 'restaurants' })
  }

  showAttractions = () => {
    axios.get(`https://api.tripexpert.com/v1/venues?api_key=44871cd75dea94cd486fba9b00171eb6&venue_type_id=3&order_by=distance&latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
      .then(res => {
        this.setState({ attractions: res.data.response.venues })
      }).catch(error => {
        console.log(error)
      })
    this.setState({ choice: 'attractions' })
  }

  render() {
    return (
      <View style={styles.pcontainer}>
        <Button onPress={this.showRestaurants}
          title="Show Restaurants" />
        <Button onPress={this.showAttractions}
          title="Show Attractions" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this.onRegionChange}
          showsBuildings
        >

          {this.state.choice === 'restaurants' ?
            (this.state.restaurants || []).map(
              (restaurant, index) =>
                <MapView.Marker
                  key={index}
                  coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
                  title={restaurant.name}
                  description={`TripExpert Score: ${restaurant.tripexpert_score ? restaurant.tripexpert_score : 'N/A'} Price: ${restaurant.price_category ? restaurant.price_category : 'N/A'}`}
                />
            ) : null}
          {this.state.choice === 'attractions' ?
            (this.state.attractions || []).map(
              (attraction, index) =>

                <MapView.Marker
                  key={index}
                  coordinate={{ latitude: attraction.latitude, longitude: attraction.longitude }}
                  title={attraction.name}
                  description={`TripExpert Score: ${attraction.tripexpert_score ? attraction.tripexpert_score : 'N/A'}`}
                />
            )

            : null}

        </MapView>
      </View>

    )
  }
}
