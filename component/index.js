/**
 * Sample React Native App
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import CONFIG from '../config/config';
import CONFI from '../config/config';
import CONFIGURE from '../config/config';
import CONF from '../config/config';
import ADDUSER from '../config/config';
import '../style/string';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    BackHandler,
    Platform,
    AppState,
} from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import SplashScreen from 'react-native-splash-screen';
import { setLocalStorageData, getLocalStorageData } from '../services/localstorage';

import Main from './route/mainroute';


export default class Index extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (<Main />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
