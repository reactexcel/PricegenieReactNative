/* eslint-disable global-require*/
/* eslint-disable import/prefer-default-export*/
/* eslint-disable no-undef*/
/* eslint-disable camelcase*/
/* eslint-disable no-redeclare*/
/* eslint-disable func-names*/
/* eslint-disable no-console*/
/* eslint-disable no-shadow*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_previouspage"] }]*/
import React, { Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { View, Text, Image, Button, Dimensions, ToastAndroid, TouchableNativeFeedback } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import Icons from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import * as action from '../services/google';
import * as actions from '../services/facebook';
import * as set from '../services/regisuser';
import '../style/basicStyle';

const style = require('../style/basicStyle');

const { width, height } = Dimensions.get('window');

export class LogoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
    this.cust_logout = this.cust_logout.bind(this);
    this.logoutWithFacebook = this.logoutWithFacebook.bind(this);
  }
  componentDidMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  cust_logout() {
    action.googleSignOut().then(() => {
      const data = '';
      const logintype = '';
      const islogin = false;
      const userdata = [{ data, logintype, islogin }];
      setLocalStorageData('user', JSON.stringify(userdata));
      ToastAndroid.showWithGravity('Sign Out Complete', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.props.close();
      this.props.handleStorage(1);
    }, error => error);
  }
  logoutWithFacebook() {
    actions.facebooksignout().then(() => {
      const data = '';
      const logintype = '';
      const islogin = false;
      const userdata = [{ data, logintype, islogin }];
      setLocalStorageData('user', userdata);
      ToastAndroid.showWithGravity('Sign Out Complete', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.props.close();
      this.props.handleStorage(1);
    }, error => error);
  }
  _previouspage() {
    this.props.navigator.pop();
  }
  render() {
    let button = <Text />;
    let name = <Text />;
    let pic = <Image style={{ height: 170, width: 150, borderRadius: 100, alignSelf: 'center' }} source={require('../img/images.jpg')} />;
    if (this.state.user !== undefined && this.state.user !== '') {
      if (this.state.user[0].logintype === 'google') {
        name = this.state.user[0].data.name;
        if (this.state.user[0].data.photo !== null && this.state.user[0].data.photo !== undefined) {
          pic = <Image style={{ height: 150, width: 150, alignSelf: 'center', borderRadius: 100 }} source={{ uri: this.state.user[0].data.photo }} />;
        } else {
          pic = <Image style={{ height: 170, width: 150, borderRadius: 100, alignSelf: 'center' }} source={require('../img/images.jpg')} />;
        }
      } else {
        const photo = JSON.parse(this.state.user[0].data.profile);
        if (photo.picture.data.url !== null && photo.picture.data.url !== undefined) {
          pic = <Image style={{ height: 150, width: 150, borderWidth: 1, borderColor: 'black', alignSelf: 'center', borderRadius: 100 }} source={{ uri: photo.picture.data.url }} />;
        } else {
          pic = <Image style={{ height: 170, width: 150, borderRadius: 100, alignSelf: 'center' }} source={require('../img/images.jpg')} />;
        }
        name = this.state.user[0].profile.name;
      }
      button = this.state.user[0].logintype === 'google' ? (
        <TouchableNativeFeedback onPress={this.cust_logout}>
          <View style={{ flexDirection: 'row' }}>
            <Icons name="sign-out" size={19} style={{ marginRight: 5 }} />
            <Text style={{ marginLeft: 5, color: 'grey', fontSize: 17, fontWeight: 'bold' }}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback onPress={this.logoutWithFacebook}>
          <View style={{ flexDirection: 'row' }}>
            <Icons name="sign-out" size={19} style={{ marginRight: 5 }} />
            <Text style={{ marginLeft: 5, color: 'grey', fontSize: 17, fontWeight: 'bold' }}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <View>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}
        >
          {pic}
          <View style={{
            marginTop: 40,
            flex: 1,
            flexDirection: 'column',
          }}
          >
            <View style={{ marginBottom: 30, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hello {name}</Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 1, marginBottom: 20 }} />
            {button}
          </View>
        </View>
      </View>
    );
  }
        }
