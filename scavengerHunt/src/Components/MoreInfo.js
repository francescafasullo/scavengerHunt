import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, Picker, Dimensions, ScrollView } from 'react-native'
import store from '../../store'
import axios from 'axios'
// import styles from '../../stylesheet'

const styles = StyleSheet.create({
  text: {
    alignSelf: 'auto', 
    fontSize: 15
  }, 

})

export default class MoreInfo extends Component {
  constructor(props) {
    super(props)
    this.venueId = store.getState().myAccount.venueId
    this.state = {
      name: '',
      website: '',
      address: '',
      telephone: '',
      hours: '',
      reviews: []
    }

  }

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    this.getInfo()
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }


  getInfo = () => {
    axios.get(`https://api.tripexpert.com/v1/venues/${this.venueId}?api_key=44871cd75dea94cd486fba9b00171eb6`)
      .then(res => {
        this.setState({
          name: res.data.response.venues[0].name,
          website: res.data.response.venues[0].website,
          address: res.data.response.venues[0].address,
          telephone: res.data.response.venues[0].telephone,
          hours: res.data.response.venues[0].opening_hours,
          reviews: res.data.response.venues[0].reviews
        })
      }).catch(error => {
        console.log(error)
      })
  }


  render() {
    return (
      <ScrollView>
      <View>
        <Text style={styles.text}>
          {`${this.state.name}
${this.state.website}
${this.state.address}
${this.state.telephone}
${this.state.hours}`}
          {this.state.reviews.map((review, index) => (
            <Text key={index} style={styles.text}>
{
`
${review.publication_name}

${review.extract}
`}
            </Text>
          ))}
        </Text>

      </View>
      </ScrollView>
    )
  }



}