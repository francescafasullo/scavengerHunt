import React, {Component} from 'react'
import { Navigator, Text, View } from 'react-native'

export default class Navigation extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ title: "Home", index: 0}}
                renderScene={(route, navigator) => 
                <HomeScreen title={route.title}
                onForward={ () => {
                    const nextIndex = route.index + 1;
                    navigator.push({
                        title: 'Scene' + nextIndex,
                        index: nextIndex
                    });
                }}

                onBack={() => {
                    if (route.index > 0) {
                        navigator.pop();
                    }
                }}
                />
            }
            />
        )
    }
}