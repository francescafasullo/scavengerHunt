import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions, } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, fitToCoordinates } from 'react-native-maps'
import store from '../../store'
import { readMapsItemsInfo } from '../../database/firebase'
import styles from '../../stylesheet'
import {mapStyle} from '../../stylesheet'

const { height, width } = Dimensions.get('window')

/*
map component represents the scavenger hunt map
when the user loads this page ("play mode")
the map they chose will open and all places will be 
represented with image-token the user has set when created the map
*/

export default class Map extends Component {
	constructor(props) {
		super(props)
		this.items = store.getState().myAccount.map.items
		this.mapRegion = store.getState().myAccount.map.mapRegion
		this.state = {
			items: []
		}

	}

	//when rendering subscribe to the store
	componentDidMount = () => {
		this.unsubscribe = store.subscribe(() => {
			this.setState(store.getState());
		});
		readMapsItemsInfo(this.items).then(res => {
			this.setState({ items: res })
		})
	}

	//prior rendering, unsubscribe to from the store
	componentWillUnmount = () => {
		this.unsubscribe();
	}

	render() {
		console.log(this.state)
		return (
			<View>
				{
					this.state.items.length ?
						<View>
							<MapView
								provider={PROVIDER_GOOGLE}
								style={styles.map}
								initialRegion={{
									latitude: this.state.items[0].latitude,
									longitude: this.state.items[0].longitude,
									latitudeDelta: .1,
									longitudeDelta: .1
								}}
							>
								{
									this.state.items.map((item, index) => (
										<MapView.Marker
											image={require('../../public/pusheenMarker.png')}
											key={index}
											coordinate={{ longitude: item.longitude, latitude: item.latitude }}
											title={item.name}
										/>
									))
								}
							</MapView>

						</View> : null
				}
			</View>
		)
	}
}
