import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, Picker } from 'react-native'
import store from '../../store'
import { logout } from '../reducers/authReducer'
import {setUserSelectedMap} from '../reducers/myAccountReducer'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7CAC9'
  },
  points: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }

});

export default class MyAccount extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.logoutAndNavigate = this.logoutAndNavigate.bind(this);
    this.setSelectedMap = this.setSelectedMap.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
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


  render() {
    console.log("in my account state", this.state);
    const userId = (this.state ? this.state.auth.userId : null)//{auth: {userId}} = this.state || {}
    console.log("in my account userId", userId);
    let index = 1;


    return (
      <View style={styles.container}>
        {userId ?
        <View>
          
           
						<Text style={styles.points}>
            
						user name: {this.state.myAccount.userPersonalInfo.username + '\n'}
            email:     {this.state.myAccount.userPersonalInfo.email + '\n'}
            score:    {this.state.myAccount.userPersonalInfo.score + '\n'} 
            </Text>
            {(this.state.myAccount.map) ? 
              <Text>chosen map: {this.state.myAccount.map.mapname}</Text> : null }
            {(this.state.myAccount.maps.length) ?
            <Picker 
            selectedValue={this.state.myAccount.maps}
            onValueChange={(itemValue, itemIndex) => this.setSelectedMap(itemIndex)}>
            {
                this.state.myAccount.maps.map(map => (
                  <Picker.Item label={map.mapname} value={map.mapname} />
                  
                  
                )
              )
            }
            
            
            </Picker>
            : null }
            <Button onPress={() => {this.logoutAndNavigate()}} title="Logout"/>
            <Button onPress={() => { this.props.navigation.navigate('NewSH') }} title="Create a new Scavenger Hunt" />
        
				  </View>  
          :
          <View>
            <Text style={styles.points}>you are not logged in </Text>
            <Button onPress={() => { this.props.navigation.navigate('SignInSignUp') }} title="Go To Login" />

          </View>
        }
      </View>





    )




  }
}

// = this.state.authReducer.userId;
//AppRegistry.registerComponent('scavengerHunt', () => MyAccountScreen);







