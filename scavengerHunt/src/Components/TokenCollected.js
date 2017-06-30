import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

export default class TokenCollected extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>
                    You've collected a pusheen!
                </Text>
                {/*INFO FROM YELP OR TRIP EXPERT*/}
            </View>
        )
    }
}
