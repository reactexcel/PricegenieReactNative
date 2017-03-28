import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var {width, height} = Dimensions.get('window');
import {View, Text, Button, Dimensions} from 'react-native';
import '../style/basicStyle'
var style = require('../style/basicStyle');
import Icon from 'react-native-vector-icons/Ionicons';

export class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    _google() {
        GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
            // play services are available. can now configure library
            GoogleSignin.configure({}).then(() => {
                // you can now call currentUserAsync()
                console.log('here');
                GoogleSignin.currentUserAsync().then((user) => {
                    console.log('USER', user);
                    if (user) {
                        this.setState({user: user});
                    } else {
                        console.log('user not found');
                        GoogleSignin.signIn().then((user) => {
                            console.log(user);
                            this.setState({user: user});
                        }).catch((err) => {
                            console.log('WRONG SIGNIN', err);
                        }).done();
                    }
                }).done();
            });
        })
    }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more" action={[]} elevation={4}>
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
                    <Button onPress={this._google} title="Sign in with Google" color="#841584"/>
                    <View style={{
                        marginTop: 50
                    }}>
                        <Button title='test' style={{
                            marginTop: 10
                        }} onpress={(fbLogin) => {
                            this.fbLogin = fbLogin
                        }} permissions={["email", "user_friends"]} loginBehavior={FBLoginManager.LoginBehaviors.Native} onLogin={function(data) {
                            console.log("Logged in!");
                            console.log(data);
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
