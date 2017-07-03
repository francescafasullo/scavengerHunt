import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
import { newMap } from '../reducers/mapsReducer'

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
		this.state = store.getState()
	}

	componentDidMount = () => {
		this.unsubscribe = store.subscribe(() => {
			this.setState(store.getState());
		});
	}

	componentWillUnmount = () => {
		this.unsubscribe();
	}

	render() {
		console.log('state in map', this.state.myAccount.map)
		return (
			<View>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={{
						latitude: this.state.myAccount.map.city.latitude,
						longitude: this.state.myAccount.map.city.longitude,
						latitudeDelta: this.state.myAccount.map.city.latitudeDelta,
						longitudeDelta: this.state.myAccount.map.city.longitudeDelta
					}}
				>
					{
						this.state.myAccount.map.items.map((item, index) => (
							<MapView.Marker
								key={index}
								coordinate={{ longitude: item.longitude, latitude: item.latitude }}
								title={item.name}
							/>
						))
					}
				</MapView>
			</View>
		)
	}
}