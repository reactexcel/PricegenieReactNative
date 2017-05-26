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
import { View, Text, Button, Dimensions, ToastAndroid } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import * as action from '../services/google';
import * as set from '../services/regisuser';
import '../style/basicStyle';

const style = require('../style/basicStyle');

const { width, height } = Dimensions.get('window');

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.cust_login = this.cust_login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
            ToastAndroid.showWithGravity(`welcome ${data.email}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
            setLocalStorageData('user', JSON.stringify(userdata));
          });
          this.props.navigator.push({ name: 'home' });
        });
        setLocalStorageData('user', JSON.stringify(userdata));
        ToastAndroid.showWithGravity(`welcome${data.email}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
    }, error => error);
  }
  handleLogin(data) {
    const logintype = 'facebook';
    const islogin = true;
    const userdata = [{ data, logintype, islogin }];
    setLocalStorageData('user', JSON.stringify(userdata));
    ToastAndroid.showWithGravity(`welcome ${data.profile.name}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    this.props.navigator.push({ name: 'home' });
  }
  _previouspage() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}
      >
        <Icon.ToolbarAndroid
          logo={require('../img/genie-logo-g.png')}
          onIconClicked={() => {
            this._previouspage();
          }}
          navIconName="ios-arrow-back"
          title=""
          style={style.toolbar}
          titleColor="white"
          overflowIconName="md-more"
          action={[]}
          elevation={4}
        >
          <View style={{
            flex: 1,
            alignSelf: 'center',
            borderWidth: 0,
            paddingLeft: width / 4.3,
            paddingTop: 15,
          }}
          >
            <Text style={{
              fontSize: 15,
              color: 'white',
            }}
            >
              Sign IN
            </Text>
          </View>
        </Icon.ToolbarAndroid>
        <View style={{
          marginTop: 200,
          margin: 50,
          flex: 1,
          flexDirection: 'column',
        }}
        >
          <Button onPress={this.cust_login} title="Sign in with Google" color="#841584" />
          <View style={{
            marginTop: 50,
          }}
          >
            <FBLogin
              facebookText={'SIGN IN WITH FACEBOOK'}
              style={{
                flex: null,
                padding: 10,
                marginTop: 10,
              }}
              onpress={(fbLogin) => {
                this.fbLogin = fbLogin;
              }}
              permissions={['email', 'user_friends']}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              onLogin={
                (data) => { this.handleLogin(data); }
              }
              onLogout={() => { }}
              onLoginFound={function (data) {}}
              onLoginNotFound={function () {}}
              onError={function (data) {}}
              onCancel={function () {}}
              onPermissionsMissing={function (data) {}}
            />
          </View>
        </View>
      </View>
    );
  }
}
LoginPage.propTypes = {
  navigator: React.PropTypes.any.isRequired,
};
