// import React, { Component } from 'react'
// import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
// import store from '../../store'
// import { newMap } from '../reducers/mapsReducer'

// const { height, width } = Dimensions.get('window')

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

// export default class Austin extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			city: {
// 				name: 'nyc',
// 				latitude: 40.759025,
// 				longitude: -73.985185,
// 				latitudeDelta: 0.04,
// 				longitudeDelta: 0.04
// 			},
// 			selectedCity: "",
// 			places: [],
// 			mapName: 'g',
// 			description: 'g'
// 		}
// 	}

// 	updateDescription = (text) => {
// 		this.setState({ mapName: text })
// 	}

// 	updateMapName = (text) => {
// 		this.setState({ description: text })
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

// 	saveSH = (mapName, description) => {
// 		const city = this.state.city
// 		const places = this.state.places
// 		console.log("something", mapName, description, city, places)
// 		store.dispatch(newMap(mapName, description, city, places))
// 	}

// 	clear = () => {
// 		this.setState({ places: [] })
// 	}

// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				{console.log(this.props)}
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
// 					this.saveSH(this.state.mapName, this.state.description)
// 					this.props.navigation.navigate('SavedConf')
// 				}} title="Save Scavenger Hunt" />
// 				<Button onPress={this.clear} title="Clear all markers" />
// 				<MapView
// 					provider={PROVIDER_GOOGLE}
// 					onPress={this.addMarker}
// 					style={styles.map}
// 					initialRegion={{
// 						latitude: 30.274573,
// 						longitude: -97.740307,
// 						latitudeDelta: 0.04,
// 						longitudeDelta: 0.04
// 					}}
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

