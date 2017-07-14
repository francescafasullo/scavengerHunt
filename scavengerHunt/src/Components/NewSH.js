import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TextInput, View, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
import { newMap, setUserSelectedMap } from '../reducers/myAccountReducer'
import styles, { mapStyle } from '../../stylesheet'
import { Button } from 'react-native-elements'

const { height, width } = Dimensions.get('window')

/*
NewSH component represents the page of creating a new scavenger hunt map
*/

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
				<Text style={styles.info_label}>Enter a name and description for your new map:</Text>
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
				<View stlye={{flexDirection: 'row'}}>
					<Button buttonStyle={styles.new_sh_button} onPress={() => {
						this.saveSH(this.state.mapName, this.state.description, this.state.location, this.state.userId)
						this.props.navigation.navigate('AddItems')
					}} title="Save Map" />
				</View>
			</View>
		)
	}
}

