import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import store from '../../store'
import { newMap } from '../reducers/mapsReducer'

const { height, width } = Dimensions.get('window')

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
    }

    componentDidMount = () => {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }

    render() {
        console.log(this.state)
        return (
            <View>
            </View>
        )
    }
}