import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import styles from '../../stylesheet'

const openMarket = {
  latlng: [40.7052066, -74.01032889999999],
  title: 'Open Market',
  description: 'Deli'
}

const fullstack = {
  latlng: [40.7050758, -74.00916039999998],
  title: 'Fullstack Academy of Code',
  description: 'Computer training school'
}

const chargingBull = {
  latlng: [40.7055537, -74.01344360000002],
  title: 'Charging Bull',
  description: 'Sculpture'
}

const markers = [openMarket, fullstack, chargingBull]

export default class PlayMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
  }

  render() {
    console.log('rendering map')
    return (
      <View style={styles.pcontainer}>
        {console.log(this.props)}
        <Text style={styles.welcome}>Find 'em all!</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7050758,
            longitude: -74.00916039999998,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
        >
          <MapView.Marker
            style={styles.pins}
            coordinate={{ longitude: -74.00916039999998, latitude: 40.7050758 }}
            title={'title'}
            description={"description"}
          />
          <MapView.Marker
            style={styles.pins}
            coordinate={{ longitude: openMarket.latlng[1], latitude: openMarket.latlng[0] }}
            title={openMarket.title}
            description={openMarket.description}
          />
          {/*markers.map(marker => {
            return (
              <MapView.marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            )
          })*/}
        </MapView>
        <Button onPress={() => { this.props.navigation.navigate('Camera') }} title="Play!" />
      </View>
    )
  }
}
