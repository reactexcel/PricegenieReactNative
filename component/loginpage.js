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
import { View, Text, Button, Image, Dimensions, ToastAndroid, TouchableNativeFeedback } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import * as action from '../services/google';
import * as actions from '../services/facebook';
import * as set from '../services/regisuser';
import '../style/basicStyle';

const style = require('../style/basicStyle');

const { width, height } = Dimensions.get('window');

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.cust_login = this.cust_login.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
  }
  cust_login() {
    action.google().then((data) => {
      if (data && data.email) {
        const info = 'mobile_google';
        const id = data.id;
        const name = data.name;
        const userEmail = data.email;
        const gender = 'male';
        const logintype = 'google';
        const device_id = DeviceInfo.getUniqueID();
        const islogin = true;
        const userdata = [{ data, logintype, islogin }];
        set.setuserinfo(info, id, name, userEmail, gender, device_id).then((value) => {
          const user_key = value.data.userid;
          FCM.getFCMToken().then((token) => {
            const fcm_reg_id = token;
            set.setuserkey(device_id, user_key, fcm_reg_id).then((value) => {});
            setLocalStorageData('user', JSON.stringify(userdata));
            ToastAndroid.showWithGravity(`welcome ${name}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
          });
          this.props.close();
          this.props.handleStorage(1);
        });
        setLocalStorageData('user', JSON.stringify(userdata));
        ToastAndroid.showWithGravity(`welcome ${name}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
    }, error => error);
  }
  loginWithFacebook() {
    actions.facebooksignin().then((data) => {
      const user = data.profile;
      const profile = JSON.parse(user);
      const logintype = 'facebook';
      const islogin = true;
      const userdata = [{ data, logintype, islogin, profile }];
      setLocalStorageData('user', JSON.stringify(userdata));
      ToastAndroid.showWithGravity(`welcome ${profile.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.props.close();
      this.props.handleStorage(1);
    }, error => error);
  }
  _previouspage() {
    this.props.navigator.pop();
  }

  render() {
    return (
      // <Image source={require('../img/splash.png')}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}
      >
        <Image style={{ height: 170, width: 150, borderRadius: 100, alignSelf: 'center' }} source={require('../img/images.jpg')} />
        <View style={{
          marginTop: 30,
            // margin: 50,
          flex: 1,
          flexDirection: 'column',
        }}
        >
          <View style={{ marginBottom: 30, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hello Guest</Text>
          </View>
          <View style={{ borderColor: 'black', borderWidth: 1, marginBottom: 20 }} />
          <Icons.Button name="google" backgroundColor="#841584" onPress={this.cust_login}>
            Login with Google
          </Icons.Button>
          <View style={{
            marginTop: 50,
          }}
          >
            <Icons.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
              Login with Facebook
            </Icons.Button>
          </View>
        </View>
      </View>
    );
  }
}
