import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, Picker,ScrollView } from 'react-native'
import store from '../../store'
import { logout } from '../reducers/authReducer'
import {setUserSelectedMap, fetchUserMaps, resetMap, resetItemBank} from '../reducers/myAccountReducer'
import styles from '../../stylesheet'
<<<<<<< HEAD
import {setUserSelectedMap, fetchUserMaps, resetMap} from '../reducers/myAccountReducer'



=======


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7CAC9'
//   },
//   points: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     color: '#000',
//     padding: 10,
//     margin: 40
//   },
//   image: {
//     width: 60,
//     height: 60,
//     justifyContent: 'center'
//   }

// });
>>>>>>> master


export default class MyAccount extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.logoutAndNavigate = this.logoutAndNavigate.bind(this);
    this.setSelectedMap = this.setSelectedMap.bind(this);
    this.getUserMaps = this.getUserMaps.bind(this)
    this.resetMapItems = this.resetMapItems.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
      //this.getUserMaps(this.state.auth.userId)
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logoutAndNavigate() {
    store.dispatch(logout());
    this.props.navigation.navigate('SignInSignUp');
  }

  setSelectedMap (mapIndex){
    store.dispatch(setUserSelectedMap(this.state.myAccount.maps[mapIndex]));
  }

  getUserMaps(userId) {
    store.dispatch(fetchUserMaps(userId))
  }

  resetMapItems() {
    store.dispatch(resetMap())
    store.dispatch(resetItemBank())
  }

  render() {
    const userId = (this.state ? this.state.auth.userId : null)//{auth: {userId}} = this.state || {}
    let index = 1;

    return (
      <View style={styles.myAccount_container}>
      <Text style={styles.myAccount_title}>My Account</Text>
      <View style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={true}
        >
        {userId ?
        <View>
        <View style={{flexDirection: 'row'}}>
						<Text style={styles.info_label}>
						user name:
            </Text>
            <Text style={styles.points}>
             {' ' + this.state.myAccount.userPersonalInfo.username }
             </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
             <Text style={styles.info_label}>
            email: 
            </Text>
            <Text style={styles.points}>
                {' '+ this.state.myAccount.userPersonalInfo.email + '\n'}
            </Text>
            </View>

            {(this.state.myAccount.map) ?
              <Text style={styles.info_label}>chosen map: {this.state.myAccount.map.mapname}</Text> : null }

            {(this.state.myAccount.map.mapname) ?
              <View>
                <Text>chosen map: {this.state.myAccount.map.mapname}</Text>
                <Button onPress={() => {
                  this.props.navigation.navigate('AddItems')
                }} title="Edit map items" />
              </View>
              : null }

            {(this.state.myAccount.maps.length) ?
            <Picker
            selectedValue={this.state.myAccount.maps}
            onValueChange={(itemValue, itemIndex) => this.setSelectedMap(itemIndex)}>
            {
                this.state.myAccount.maps.map((map, index) => (
                  <Picker.Item key={index} label={map.mapname} value={map.mapname} />
                )
              )
            }
            </Picker>
            : null }
            <View style={styles.myAccount_buttons_view }>
            <Button onPress={this.resetMapItems} title="RESET MAP PINS"/>
            <Button onPress={() => {this.logoutAndNavigate()}} title="Logout"/>
            <Button onPress={() => { this.props.navigation.navigate('NewSH') }} title="Create a new Scavenger Hunt" />
            </View>
            {(this.state.myAccount.itemBank) ?
              this.state.myAccount.itemBank.map((item) => (
                <View>
                  <Text style={styles.points}>
                  {item.name+' '}
                  {item.address+' '}
                  {item.date+' '}
                  </Text>
                  <Image style={styles.image} source={require('../../public/pusheenMarker.png')}/>
                </View>
                )
              )
              : null
            }
				  </View>
          :
          <View>
            <Text style={styles.points}>you are not logged in </Text>
            <Button onPress={() => { this.props.navigation.navigate('SignInSignUp') }} title="Go To Login" />

          </View>
        }
        </ScrollView>
      </View>
    )
  }
}
