/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Navigator
} from 'react-native';
import {Home} from './component/home';

export class PriceGenie_React_Native extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#01579b" barStyle="light-content"/>
                <Navigator initialRoute={{
                    name: 'home'
                }} renderScene={this.renderScene}/>
            </View>
        );
    }
    renderScene(route, navigator) {
        if (route.name === 'home') {
            return (<Home navigator={navigator}/>);
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
AppRegistry.registerComponent('PriceGenie_React_Native', () => PriceGenie_React_Native);
