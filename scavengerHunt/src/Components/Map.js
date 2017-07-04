import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, fitToCoordinates } from 'react-native-maps'
import store from '../../store'
import { readMapsItemsInfo } from '../../database/firebase'

const { height, width } = Dimensions.get('window')

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

export default class Map extends Component {
	constructor(props) {
		super(props)
		this.items = store.getState().myAccount.map.items
		this.state = {
			items: []
		}

	}



	componentDidMount = () => {
		this.unsubscribe = store.subscribe(() => {
			this.setState(store.getState());
		});
		console.log('!@#$%^&*()(*^%$#@#$%^&*(*$#@#$%^&*&$#@#$%^&*&^$##$%^&*&^%$#$%^&*')
		readMapsItemsInfo(this.items).then(res => {
			console.log("!!@@#$%^&*()(*&^%$#@!@#$%^&", res)
			this.state.items = res
		})
	}

	componentWillUnmount = () => {
		this.unsubscribe();
	}

	centerMarkers = () => {
		const markers = this.state.myAccount.map.items
		var bounds = new google.maps.LatLngBounds();
		for (i = 0; i < markers.length; i++) {
			bounds.extend(markers[i].getPosition());
		}
		map.setCenter(bounds.getCenter());
	}

	render() {
		return (
			<View>
			{this.state.items.length ? 
				<MapView
					ref={(ref) => { this.mapRef = ref }}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
				initialRegion={{
					latitude: this.state.items[0].latitude,
					longitude: this.state.items[0].longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				}}
				>
					{
						this.state.items.map((item, index) => (
							<MapView.Marker
								key={index}
								coordinate={{ longitude: item.longitude, latitude: item.latitude }}
								title={item.name}
							/>
						))
					}
				</MapView> : null}
			</View>
		)
	}
}