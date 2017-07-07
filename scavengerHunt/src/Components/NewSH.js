import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TextInput, View, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
import { newMap, setUserSelectedMap } from '../reducers/myAccountReducer'
import styles, { mapStyle } from '../../stylesheet'
import {Button} from 'react-native-elements'

const { height, width } = Dimensions.get('window')

// const mapStyle =
// 	[
// 		{
// 			"featureType": "road",
// 			"stylers": [
// 				{
// 					"hue": "#5e00ff"
// 				},
// 				{
// 					"saturation": -79
// 				}
// 			]
// 		},
// 		{
// 			"featureType": "poi",
// 			"stylers": [
// 				{
// 					"saturation": -78
// 				},
// 				{
// 					"hue": "#6600ff"
// 				},
// 				{
// 					"lightness": -47
// 				},
// 				{
// 					"visibility": "off"
// 				}
// 			]
// 		},
// 		{
// 			"featureType": "road.local",
// 			"stylers": [
// 				{
// 					"lightness": 22
// 				}
// 			]
// 		},
// 		{
// 			"featureType": "landscape",
// 			"stylers": [
// 				{
// 					"hue": "#6600ff"
// 				},
// 				{
// 					"saturation": -11
// 				}
// 			]
// 		},
// 		{},
// 		{},
// 		{
// 			"featureType": "water",
// 			"stylers": [
// 				{
// 					"saturation": -65
// 				},
// 				{
// 					"hue": "#1900ff"
// 				},
// 				{
// 					"lightness": 8
// 				}
// 			]
// 		},
// 		{
// 			"featureType": "road.local",
// 			"stylers": [
// 				{
// 					"weight": 1.3
// 				},
// 				{
// 					"lightness": 30
// 				}
// 			]
// 		},
// 		{
// 			"featureType": "transit",
// 			"stylers": [
// 				{
// 					"visibility": "simplified"
// 				},
// 				{
// 					"hue": "#5e00ff"
// 				},
// 				{
// 					"saturation": -16
// 				}
// 			]
// 		},
// 		{
// 			"featureType": "transit.line",
// 			"stylers": [
// 				{
// 					"saturation": -72
// 				}
// 			]
// 		},
// 		{}
// 	]

// const styles = StyleSheet.create({
// 	welcome: {
// 		fontSize: 20,
// 		textAlign: 'center',
// 		margin: 10,
// 	},
// 	picker: {
// 		width: 300,
// 		alignSelf: 'center'
// 	},
// 	map: {
// 		width: width,
// 		height: 500,
// 		alignSelf: 'center',
// 	},
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		backgroundColor: '#BFD8D2'
// 	},
// })

export default class NewSH extends Component {
	constructor(props) {
		super(props)
		userId = store.getState().auth.userId
		user = store.getState().myAccount
		this.onRegionChange = this.onRegionChange.bind(this)
		this.state = {
			user: user,
			places: [],
			mapName: '',
			description: '',
			mapRegion: null,
			lastLat: null,
			lastLong: null,
			location: '',
			userId: userId
		}
	}

	componentDidMount() {
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				let region = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.00922 * 2,
					longitudeDelta: 0.00421 * 2
				}
				this.onRegionChange(region, region.latitude, region.longitude)
			}
		)
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId)
	}

	onRegionChange(region, lastLat, lastLong) {
		this.setState({
			mapRegion: region,
			// If there are no new values set the current ones
			lastLat: lastLat || this.state.lastLat,
			lastLong: lastLong || this.state.lastLong
		});
	}

	addMarker = evt => {
		const { coordinate } = evt.nativeEvent
		this.setState({
			places: [
				...this.state.places, {
					coordinate, title: 'Find Pusheen!', description: 'Pusheen has been dropped at this location.',
				}]
		})
	}

	saveSH = (mapName, description, location, userId) => {
    store.dispatch(newMap(mapName, description, location, userId))
	}

	clear = () => {
		this.setState({ places: [] })
	}

	updateDescription = (text) => {
		this.setState({ description: text })
	}

	updateMapName = (text) => {
		this.setState({ mapName: text })
	}

	updateLocation = (text) => {
		this.setState({ location: text })
	}

	render() {
		return (
			<View style={styles.new_sh_instructions}>
				<Text style={styles.info_label}>Enter a map name and description:</Text>
				<TextInput
					style={{ height: 40 }}
					placeholder="Map Name"
					onChangeText={this.updateMapName}
				/>
				<TextInput
					style={{ height: 40 }}
					placeholder="Description"
					onChangeText={this.updateDescription}
				/>
				<TextInput
					style={{ height: 40 }}
					placeholder="Location"
					onChangeText={this.updateLocation}
				/>
				<View style={{flexDirection: 'row'}}>
				<Button buttonStyle={styles.new_sh_button} onPress={() => {
					this.saveSH(this.state.mapName, this.state.description, this.state.location, this.state.userId)
					this.props.navigation.navigate('AddItems')
				}} title="Save Map" />
				</View>
				
			</View>
		)
	}
}

