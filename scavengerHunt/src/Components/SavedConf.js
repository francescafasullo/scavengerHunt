import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import styles from '../../stylesheet'




export default class SavedConf extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
      Map saved!
      </Text>
      </View>
    )
  }
}
