import { StyleSheet, Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7CAC9'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  //Camera and SignInSignUp
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  //Camera
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  overlay: {
    justifyContent: 'center',
    top: 100,
    left: 100,
    width: 200,
    height: 100
  },
  arDisplay: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1
  },
    //MyAccount
  points: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  //PlayModeMap
  marker: {
    height: 100,
    width: 200
  },
    map: {
    width: width,
    height: height,
    alignSelf: 'center',
  },
    pcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BFD8D2'
  },
  //NewSH
  	picker: {
		width: 300,
		alignSelf: 'center'
	},
})

 export const mapStyle =
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