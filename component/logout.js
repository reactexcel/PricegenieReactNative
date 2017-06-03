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
import { View, Text, Button, Dimensions, ToastAndroid, TouchableNativeFeedback } from 'react-native';
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

export class LogoutPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      user : '',
    }
    this.cust_logout = this.cust_logout.bind(this);
    this.logoutWithFacebook=this.logoutWithFacebook.bind(this);
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
      this.props.navigator.push({name:'home'})
    }, error => error);
  }
  logoutWithFacebook(){
    actions.facebooksignout().then(() => {
      const data = '';
      const logintype = '';
      const islogin = false;
      const userdata = [{ data, logintype, islogin }];
      setLocalStorageData('user', userdata);
      ToastAndroid.showWithGravity('Sign Out Complete', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.props.close();
      this.props.navigator.push({name:'home'})
    }, error => error);
  }
  _previouspage() {
    this.props.navigator.pop();
  }
  render() {
    let button=<Text></Text>;
    let name=<Text></Text>;
    if(this.state.user !== undefined && this.state.user !== ''){
      if(this.state.user[0].logintype==='google'){
        name=this.state.user[0].data.name;
      } else {
        name=this.state.user[0].profile.name;
      }
      button=this.state.user[0].logintype==="google"?(
        <Icons.Button name="google" backgroundColor="#841584" onPress={this.cust_logout}>
          Logout with Google
        </Icons.Button>
      ):(
        <Icons.Button name="facebook" backgroundColor="#3b5998" onPress={this.logoutWithFacebook}>
          Logout with Facebook
        </Icons.Button>
      )
    }
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}
      >
        {/* <Icon.ToolbarAndroid
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
              Sign Out
            </Text>
          </View>
        </Icon.ToolbarAndroid> */}
        <View style={{
          marginTop: 100,
          // margin: 50,
          flex: 1,
          flexDirection: 'column',
        }}
        >
          <View style={{marginBottom:30,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Hello {name}</Text>
          </View>
          <View style={{borderColor:'black',borderWidth:1,marginBottom:20}}>
          </View>
          {button}
          {/* <Icons.Button name="google" backgroundColor="#841584" onPress={this.cust_logout}>
            Logout with Google
            </Icons.Button>
            <Icons.Button name="facebook" backgroundColor="#3b5998" onPress={this.logoutWithFacebook}>
            Logout with Facebook
          </Icons.Button> */}
        </View>
      </View>
    );
  }
}
