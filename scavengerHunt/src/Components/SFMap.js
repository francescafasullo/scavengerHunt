// import React, { Component } from 'react'
// import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
// import store from '../../store'
// import { newMap } from '../reducers/mapsReducer'

<<<<<<< HEAD
// const {height, width} = Dimensions.get('window')
=======
const { height, width } = Dimensions.get('window')
>>>>>>> changed map saved page

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
// 		width: 500,
// 		height: 500,
// 		alignSelf: 'center',
// 	},
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		backgroundColor: '#BFD8D2'
// 	},
// })

// export default class NYC extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = store.getState()
// 		this.state.city = {
// 			name: 'nyc',
// 			latitude: 40.759025,
// 			longitude: -73.985185,
// 			latitudeDelta: 0.04,
// 			longitudeDelta: 0.04
// 		}
// 		this.state.selectedCity = ""
// 		this.state.places = []
// 		this.state.mapName = ""
// 		this.state.description = ""
// 	}

// 	updateDescription = (text) => {
// 		this.setState({ mapName: text })
// 	}

// 	updateMapName = (text) => {
// 		this.setState({ description: text })
// 	}

// 	componentDidMount = () => {
// 		this.unsubscribe = store.subscribe(() => {
// 			this.setState(store.getState());
// 		});
// 	}

// 	componentWillUnmount = () => {
// 		this.unsubscribe();
// 	}


// 	addMarker = evt => {
// 		const { coordinate } = evt.nativeEvent
// 		this.setState({
// 			places: [
// 				...this.state.places, {
// 					coordinate, title: 'Find Pusheen!', description: 'Pusheen has been dropped at this location.',
// 				}]
// 		})
// 	}

// 	saveSH = (mapName, description, userId) => {
// 		const city = this.state.city
// 		const places = this.state.places
// 		store.dispatch(newMap(mapName, description, city, places, userId))
// 	}

// 	clear = () => {
// 		this.setState({ places: [] })
// 	}

<<<<<<< HEAD
// 	render() {
// 		const userId = (this.state ? this.state.auth.userId : null)
// 		return (
// 			<View style={styles.container}>
// 				<Text>Enter new map name and description.</Text>
// 				<TextInput
// 					style={{ height: 40 }}
// 					placeholder="Map Name"
// 					onChangeText={this.updateMapName}
// 				/>
// 				<TextInput
// 					style={{ height: 40 }}
// 					placeholder="Description"
// 					onChangeText={this.updateDescription}
// 				/>
// 				<Button onPress={() => {
// 					this.saveSH(this.state.mapName, this.state.description, userId)
// 					this.props.navigation.navigate('SavedConf')
// 				}} title="Save Scavenger Hunt" />
// 				<Button onPress={this.clear} title="Clear all markers" />
// 				<MapView
// 					provider={PROVIDER_GOOGLE}
// 					style={styles.map}
// 					initialRegion={{
// 						latitude: 37.827888,
// 						longitude: -122.422899,
// 						latitudeDelta: 0.04,
// 						longitudeDelta: 0.04
// 					}}
// 					onPress={this.addMarker}
// 				>
// 					{
// 						(this.state.places || []).map(
// 							place =>
// 								<MapView.Marker
// 									coordinate={place.coordinate}
// 									title={place.title}
// 									description={place.description}
// 								/>
// 						)
// 					}
// 				</MapView>
// 			</View>
// 		)
// 	}
// }
=======
	render() {
		const userId = (this.state ? this.state.auth.userId : null)
		return (
			<View style={styles.container}>
				<Text>Enter new map name and description.</Text>
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
				<Button onPress={() => {
					this.saveSH(this.state.mapName, this.state.description, userId)
					this.props.navigation.navigate('SavedConf')
				}} title="Save Scavenger Hunt" />
				<Button onPress={this.clear} title="Clear all markers" />
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={{
						latitude: 37.827888,
						longitude: -122.422899,
						latitudeDelta: 0.04,
						longitudeDelta: 0.04
					}}
					onPress={this.addMarker}
				>
					{
						(this.state.places || []).map(
							(place, index) =>
								<MapView.Marker
									key={index}
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
>>>>>>> changed map saved page

