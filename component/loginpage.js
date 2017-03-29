import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var {width, height} = Dimensions.get('window');
import {View, Text, Button, Dimensions} from 'react-native';
import '../style/basicStyle'
var style = require('../style/basicStyle');
import Icon from 'react-native-vector-icons/Ionicons';
import * as action from '../services/google';

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.cust_login = this.cust_login.bind(this);
    }
    cust_login() {
        action.google().then((data) => {
            if (data && data.email) {
                let userEmail = data.email;
                setLocalStorageData('user', userEmail);
                this.props.navigator.push({name: 'home'});
            }
        }, (error) => {
            console.log(error);
        });
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={() => {
                    this._previouspage()
                }} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more" action={[]} elevation={4}>
                    <View style={{
                        flex: 1,
                        alignSelf: 'center',
                        borderWidth: 0,
                        paddingLeft: width / 4.5,
                        paddingTop: 15
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: 'white'
                        }}>
                            Sign IN
                        </Text>
                    </View>
                </Icon.ToolbarAndroid>
                <View style={{
                    marginTop: 200,
                    margin: 50,
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <Button onPress={this.cust_login} title="Sign in with Google" color="#841584"/>
                    <View style={{
                        marginTop: 50
                    }}>
                        <FBLogin style={{
                            marginTop: 10,
                            padding: 20
                        }} onpress={(fbLogin) => {
                            this.fbLogin = fbLogin
                        }} permissions={["email", "user_friends"]} loginBehavior={FBLoginManager.LoginBehaviors.Native} onLogin={function(data) {
                            console.log("Logged in!");
                            setLocalStorageData('user', user.email),
                            this.successLogin()
                        }} onLogout={function() {
                            console.log("Logged out.");
                        }} onLoginFound={function(data) {
                            console.log("Existing login found.");
                            console.log(data);
                        }} onLoginNotFound={function() {
                            console.log("No user logged in.");
                        }} onError={function(data) {
                            console.log("ERROR");
                            console.log(data);
                        }} onCancel={function() {
                            console.log("User cancelled.");
                        }} onPermissionsMissing={function(data) {
                            console.log("Check permissions!");
                            console.log(data);
                        }}/>
                    </View>
                </View>
            </View>
        );
    }
}
