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
    Navigator,
    BackAndroid
} from 'react-native';
import {Home} from './component/home';
import {Subcategory} from './component/subcategory';
let onMainScreen = true
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (route.name !== "home") {
        navigator.pop();
        return true;
    }
    return false;
});

export class PriceGenie_React_Native extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.configureScene = this.configureScene.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#01579b" barStyle="light-content"/>
                <Navigator initialRoute={{
                    name: 'home',
                    payload: {}
                }} renderScene={this.renderScene}/>
            </View>
        );
    }
    renderScene(route, navigator) {
        global.route = route;
        global.navigator = navigator;
        if (route.name === 'home') {
            return (<Home navigator={navigator} {...route.payload}/>);
        } else if (route.name === 'subcategory') {
            return (<Subcategory navigator={navigator} {...route.payload}/>);
        }
    }
    configureScene(route, routeStack) {
        if (route.name === 'home') {
            return Navigator.SceneConfigs.PushFromRight
        } else if (route.name === 'subcategory') {
            return Navigator.SceneConfigs.PushFromRight
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});
AppRegistry.registerComponent('PriceGenie_React_Native', () => PriceGenie_React_Native);
