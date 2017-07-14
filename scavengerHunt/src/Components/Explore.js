import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, Picker, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, MyCustomCalloutView } from 'react-native-maps'
import store from '../../store'
import axios from 'axios'
import { setVenueId } from '../reducers/myAccountReducer'
import styles from '../../stylesheet'
import { Button } from 'react-native-elements'

/*
Explore class represents exlore page
this the page where the user can see pins of recommended places to visit
on the map
*/

export default class Explore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      rcategories: [],
      acategories: [],
      attractions: [],
      latitude: "",
      longitude: "",
      choice: "",
      venueId: ""
    }
  }

  //when component is rendered, subscribe to the store
  //and set watchId
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

  //when a map rigon changes, needs to update the state
  onRegionChange = (region, lastLat, lastLong) => {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  //prior rendering, unsubscrib from the store
  componentWillUnmount = () => {
    this.unsubscribe();
  }

  //fetching restaurants information from tripexpert
  showRestaurants = () => {
    axios.get(`https://api.tripexpert.com/v1/venues?api_key=44871cd75dea94cd486fba9b00171eb6&venue_type_id=2&order_by=distance&latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
      .then(res => {
        this.setState({ restaurants: res.data.response.venues })
      }).catch(error => {
        console.log(error)
      })
    this.setState({ choice: 'restaurants' })
  }

  //fetching attractions other than restaurants from tripexpert
  showAttractions = () => {
    axios.get(`https://api.tripexpert.com/v1/venues?api_key=44871cd75dea94cd486fba9b00171eb6&venue_type_id=3&category_ids&order_by=distance&latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
      .then(res => {
        console.log(res.data)
        this.setState({ attractions: res.data.response.venues })
      }).catch(error => {
        console.log(error)
      })
    this.setState({ choice: 'attractions' })
  }

  //update the store with the chosen place the user fetched info
  infoMarker = (id, latitude, longitude) => {
    store.dispatch(setVenueId(id, latitude, longitude))
  }

  render() {
    return (
      <View style={styles.myAccount_container}>
        <Button buttonStyle={styles.addItems_button} onPress={this.showAttractions}
          title="Show Attractions" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.explore_map}
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

                >
                  <MapView.Callout  onPress={() => {
                    this.infoMarker(restaurant.id)
                    this.props.navigation.navigate('MoreInfo')
                  }}
                  >
                    <View>
                      <Text>
{`${restaurant.name}
TripExpert Score: ${restaurant.tripexpert_score ? restaurant.tripexpert_score : 'N/A'}
Price: ${restaurant.price_category ? restaurant.price_category : 'N/A'}
Tap for more info!`}
                      </Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
            ) : null}
          {this.state.choice === 'attractions' ?
            (this.state.attractions || []).map(
              (attraction, index) =>
                <MapView.Marker
                  key={index}
                  coordinate={{ latitude: attraction.latitude, longitude: attraction.longitude }}
                >
                  <MapView.Callout onPress={() => {
                    this.infoMarker(attraction.id)
                    this.props.navigation.navigate('MoreInfo')
                  }}
                  >
                    <View>
                      <Text>
{`${attraction.name}
TripExpert Score: ${attraction.tripexpert_score ? attraction.tripexpert_score : 'N/A'}
Tap for more info!`}
                      </Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
            )

            : null}

        </MapView>
      </View>

    )
  }
}
