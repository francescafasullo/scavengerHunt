import { StyleSheet, Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7CAC9'
    //backgroundColor: '#F5FCFF'
  },
  welcome_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCF1E3',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#FFB100'
  },
  myAccount_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF'

  },
  myAccount_title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
    color: '#808080',


  },
  myAccount_buttons_view :{

    flex: 1,
    alignItems: 'flex-start',
    top: 5

  },
  myAccount_bank_list_view:{
    flex: 1,
    alignItems: 'flex-start',
    top: 10,
    bottom: 5
  },
  myAccount_button: {
    height:40,
    width: 200,
    borderRadius:20,
    backgroundColor: '#538cc6',
    margin: 10,
    color: 'black'


  },
  myAccount_image: {
    width: 60,
    height: 60,
    justifyContent: 'center'
  
  },
  myAccount_picker_view: {
    marginBottom: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

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
  camera_buttons_view:{
    flexDirection: 'row'
  }, 
  capture: {
    flex: 0,
    //flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: '#000000',
    borderRadius: 5,
    padding: 10,
    margin: 40,
    
  },
  camera_button:{
    margin: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: '#000000',
},

  overlay: {
     top: 100,
     left: 50,
    width: 300,
    height: 200
  },
  arDisplay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    
    //flexDirection: 'column',
    justifyContent: 'space-between',
  },
  arText: {
    flex: 1,
    fontSize: 33,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.5)'

  },
  view_no_background: {
    alignItems: 'center',
    top: 100,
    justifyContent: 'center'
  },
    //MyAccount
  points: {
    fontSize: 20,
    textAlign: 'left',
    
  },
  info_label :{
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#808080'


  },
  new_sh_instructions: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#808080'
  },
  new_sh_button: {
    height:40,
    width: 130,
    borderRadius:20,
    backgroundColor: '#D8BFD8',
    margin: 10,
    color: 'black'

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
    backgroundColor: '#F0F8FF'
  },
  //NewSH
  	picker: {
		width: 300,
		alignSelf: 'center'
	}
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