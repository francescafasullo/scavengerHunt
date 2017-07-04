import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, fitToCoordinates } from 'react-native-maps'
import store from '../../store'
import { readMapsItemsInfo } from '../../database/firebase'
//import styles from '../../stylesheet'
//import {mapStyle} from '../../stylesheet'

const { height, width } = Dimensions.get('window')

const mapStyle =
[
    {
        "featureType": "road",
        "stylers": [
            {
                "hue": "#5e00ff"
            },
            {
                "saturation": -79
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "saturation": -78
            },
            {
                "hue": "#6600ff"
            },
            {
                "lightness": -47
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#6600ff"
            },
            {
                "saturation": -11
            }
        ]
    },
    {},
    {},
    {
        "featureType": "water",
        "stylers": [
            {
                "saturation": -65
            },
            {
                "hue": "#1900ff"
            },
            {
                "lightness": 8
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "weight": 1.3
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#5e00ff"
            },
            {
                "saturation": -16
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "saturation": -72
            }
        ]
    },
    {}
]

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
		readMapsItemsInfo(this.items).then(res => {
			this.setState({ items: res })
		})
	}

	componentWillUnmount = () => {
		this.unsubscribe();
	}

	render() {
		console.log(this.state)
		return (
			<View>
				{this.state.items.length ?
					<MapView
						provider={PROVIDER_GOOGLE}
						customMapStyle={mapStyle}
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
									image={require('../../public/pusheenMarker.png')}
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