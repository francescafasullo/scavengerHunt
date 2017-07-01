import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import store from '../../store'
import { newMap } from '../reducers/mapsReducer'

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

export default class NewSH extends Component {
	constructor(props) {
		super(props)
		this.state = {
			city: {},
			cities: [
				{
					name: 'nyc',
					latitude: 40.759025,
					longitude: -73.985185,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				},
				{
					name: 'sf',
					latitude: 37.827888,
					longitude: -122.422899,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				},
				{
					name: "la",
					latitude: 34.134323,
					longitude: -118.321569,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				},
				{
					name: "austin",
					latitude: 30.274573,
					longitude: -97.740307,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				}
			],
			selectedCity: "",
			places: [],
			mapName: '',
			description: ''
		}
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

	saveSH = (mapName, description) => {
		console.log("something", mapName, description, city, places)
		let city = this.state.cities.filter(city => {
			return city.name === this.state.selectedCity
		})
		const places = this.state.places

		store.dispatch(newMap(mapName, description, city, places))
	}

	clear = () => {
		this.setState({ places: [] })
	}

	updateDescription = (text) => {
		this.setState({ mapName: text })
	}

	updateMapName = (text) => {
		this.setState({ description: text })
	}

	render() {
		return (
			<View style={styles.container}>
				<Picker style={styles.picker} selectedValue={this.state.selectedCity}
					onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}
				>
					<Picker.Item label="Select a city!" />
					<Picker.Item label="New York City" value="nyc" />
					<Picker.Item label="San Francisco" value="sf" />
					<Picker.Item label="Los Angeles" value="la" />
					<Picker.Item label="Austin" value="austin" />

				</Picker>
				{this.state.selectedCity === 'nyc' ?
					this.props.navigation.navigate('NYCMap') : null}
				{this.state.selectedCity === 'sf' ?
					this.props.navigation.navigate('SFMap') : null}
				{this.state.selectedCity === 'la' ?
					this.props.navigation.navigate('LAMap') : null}
				{this.state.selectedCity === 'austin' ?
					this.props.navigation.navigate('AustinMap') : null}
			</View>
		)
	}
}

