import React, {Component} from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'

const styles = StyleSheet.create({
	welcome: {
		fontSize: 40,
		textAlign: 'center',
		margin: 10,
		color: 'white'
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

export default class SavedConf extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
			<Image source={require('../../public/mapsaved.png')}/>
      <Text style={styles.welcome}>
      Map saved!
      </Text>
      </View>
    )
  }
}
