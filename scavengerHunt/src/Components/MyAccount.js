import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, Picker,ScrollView } from 'react-native'
import store from '../../store'
import { logout } from '../reducers/authReducer'
import {setUserSelectedMap, fetchUserMaps, resetMap, resetItemBank} from '../reducers/myAccountReducer'
import styles from '../../stylesheet'
import {Button, List, ListItem} from 'react-native-elements'




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
      // this.getUserMaps(this.state.auth.userId)
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logoutAndNavigate() {
    store.dispatch(logout());
    this.props.navigation.navigate('SignInSignUp');
  }

  setSelectedMap(mapIndex) {
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
    let list


    return (
      <View style={styles.myAccount_container}>
      <Text style={styles.myAccount_title}>My Account</Text>
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

            {(this.state.myAccount.map.mapname) ?
              <View>
                <Text style={styles.info_label}>chosen map: {this.state.myAccount.map.mapname}</Text>
                <Button buttonStyle={styles.myAccount_button} onPress={() => {
                  this.props.navigation.navigate('AddItems')
                }} title="Edit map items" />
              </View>
              : null }
            
            {(this.state.myAccount.maps.length) ?
            <Picker name="Your maps:"
            selectedValue={this.state.myAccount.maps}
            onValueChange={(itemValue, itemIndex) => this.setSelectedMap(itemIndex)}>
            {
                this.state.myAccount.maps.map((map, index) => (
                  <Picker.Item key ={index} label={map.mapname} value={map.mapname} />
                  
                  
                )
              )
            }
            </Picker>
            : null }
            <View style={styles.myAccount_buttons_view }>
            <Button buttonStyle={styles.myAccount_button} onPress={this.resetMapItems} title="RESET MAP PINS" />
            <Button buttonStyle={styles.myAccount_button} onPress={() => { this.props.navigation.navigate('NewSH') }} title="Create a new Scavenger Hunt" />
            <Button buttonStyle={styles.myAccount_button} onPress={() => {this.logoutAndNavigate()}} title="Logout"/>
            </View>
            <View style={styles.myAccount_bank_list_view}>
            <Text style={styles.info_label}>Places you have been:</Text>
            </View>
            {(this.state.myAccount.itemBank) ?
              <List containerStyle={{marginBottom: 20}}>
              {
              this.state.myAccount.itemBank.map((item) => (
                <ListItem
      
                  roundAvatar
                  title={item.name+' '}
                  subtitle={item.address+' '+item.date}
                  avatar={require('../../public/pusheenMarker.png')}
                  />
                )
              )
            }
            {console.log(this.state.itemBank)}
              </List>
              : null
            }
				  </View>

          :
          <View>
            <Text style={styles.points}>you are not logged in </Text>
            <Button buttonStyle={styles.myAccount_button} onPress={() => { this.props.navigation.navigate('SignInSignUp') }} title="Go To Login" />

          </View>
        }
        </ScrollView>
      </View>
    )
  }
}
