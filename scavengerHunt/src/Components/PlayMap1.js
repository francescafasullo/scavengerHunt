import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BFD8D2'
  },
})

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

export default class PlayMap1 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('rendering map')
    return (
      <View style={styles.container}>
        {console.log(this.props)}
        <Text style={styles.welcome}>Find 'em all!</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.759025,
            longitude: -73.985185,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
        >
          <MapView.Marker
            coordinate={{ longitude: -74.00916039999998, latitude: 40.7050758 }}
            title={'title'}
            description={"description"}
          />
          <MapView.Marker
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

