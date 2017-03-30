/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import CONFIG from './config/config'
import CONFI from './config/config'
import CONFIGURE from './config/config'
import './style/string';
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
import {getLocalStorageData} from './services/localstorage'
import {setLocalStorageData} from './services/localstorage'
import {Subcategory} from './component/subcategory';
import {ProductPage} from './component/ProductPage';
import {Filter} from './component/filter';
import {ProductView} from './component/productView';
import {PieChartBasic} from './component/graph';
import {VariantPoduct} from './component/variant';
import {LoginPage} from './component/loginpage';
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
                }} renderScene={this.renderScene} configureScene={this.configureScene}/>
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
        } else if (route.name === 'productPage') {
            return (<ProductPage navigator={navigator} {...route.payload}/>);
        } else if (route.name === 'filter') {
            return (<Filter navigator={navigator} {...route.payload}/>);
        } else if (route.name === 'productview') {
            return (<ProductView navigator={navigator} {...route.payload}/>);
        } else if (route.name === 'graph') {
            return (<PieChartBasic navigator={navigator} {...route.payload}/>);
        } else if (route.name === 'variant') {
            return (<VariantPoduct navigator={navigator} {...route.payload}/>);
        } else if (route.name === 'login') {
            return (<LoginPage navigator={navigator} {...route.payload}/>);
        }
    }
    configureScene(route, routeStack) {
        if (route.name === 'home') {
            return Navigator.SceneConfigs.PushFromRight
        } else if (route.name === 'subcategory') {
            return Navigator.SceneConfigs.PushFromRight
        } else if (route.name === 'productPage') {
            return Navigator.SceneConfigs.FadeAndroid
        } else if (route.name === 'filter') {
            return Navigator.SceneConfigs.FadeAndroid
        } else if (route.name === 'productview') {
            return Navigator.SceneConfigs.FadeAndroid
        } else if (route.name === 'graph') {
            return Navigator.SceneConfigs.FadeAndroid
        } else if (route.name === 'variant') {
            return Navigator.SceneConfigs.FloatFromBottom
        } else if (route.name === 'login') {
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
