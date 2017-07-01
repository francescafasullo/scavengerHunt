import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, Picker } from 'react-native'
import MapView from 'react-native-maps'
import {getMaps} from '../reducers/mapsReducer'
import store from '../../store'

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

export default class Play extends Component {
	constructor(props) {
		super(props)
		this.state = store.getState()
	}

	componentDidMount = () => {
		store.dispatch(getMaps())
	}

	render() {
		return (
			<View >
			{console.log(this.state)}
				<Text >
					Select a scavenger hunt!
            </Text>
				<Picker
					selectedValue={this.state.map}
					onValueChange={(itemValue, itemIndex) => this.setState({ selectedMap: itemValue })}>
					<Picker.Item label="Map1" value="map1" />
					<Picker.Item label="Map2" value="map2" />
				</Picker>
				{/*<MapView
					style={styles.map}
					initialRegion={{
						latitude: this.state.selectedMap.latitude,
						longitude: this.state.selectedMap.longitude,
						latitudeDelta: this.state.selectedMap.latitudeDelta
						longitudeDelta: this.state.selectedMap.longitudeDelta
					}}/>*/}
				

			</View>

		)
	}
}