import React, {PropTypes, Component} from 'react';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import {View, Text, Button, ScrollView} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
export class Login extends Component {
    googleLogin() {
        return new Promise((resolve, reject) => {
            GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
                // play services are available. can now configure library
                GoogleSignin.configure({}).then(() => {
                    // you can now call currentUserAsync()
                    console.log('here');
                    GoogleSignin.currentUserAsync().then((user) => {
                        // console.log('USER', user);
                        if (user) {
                            // AsyncStorage.setItem("user", infouser);
                            // this.setState({infouser: user});
                            resolve(user);

                        } else {
                            console.log('user not found');
                            GoogleSignin.signIn().then((user) => {
                                console.log(user);
                                resolve(user);
                            }).catch((err) => {
                                reject(err);
                            }).done();
                        }
                    }).catch(() => {
                        reject('Could Not Get Current User')
                    }).done();
                }).catch(() => {
                    reject('Configure Failed')
                });
            }).catch(() => {
                reject(new Error('Google Play Services Not Configured'))
            })
        })
        // console.log(data);
    }
    _signIn() {
        this.googleLogin().then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
            // AsyncStorage.setItem("myKey", error);
        });
    }
    render() {
        var _this = this;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <FBLogin style={{
                            marginTop: 10
                        }} onpress={(fbLogin) => {
                            this.fbLogin = fbLogin
                        }} permissions={["email", "user_friends"]} loginBehavior={FBLoginManager.LoginBehaviors.Native} onLogin={function(data) {
                            console.log("Logged in!");
                            console.log(data);
                            _this.setState({user: data.credentials});
                        }} onLogout={function() {
                            console.log("Logged out.");
                            _this.setState({user: null});
                        }} onLoginFound={function(data) {
                            console.log("Existing login found.");
                            console.log(data);
                            _this.setState({user: data.credentials});
                        }} onLoginNotFound={function() {
                            console.log("No user logged in.");
                            _this.setState({user: null});
                        }} onError={function(data) {
                            console.log("ERROR");
                            console.log(data);
                        }} onCancel={function() {
                            console.log("User cancelled.");
                        }} onPermissionsMissing={function(data) {
                            console.log("Check permissions!");
                            console.log(data);
                        }}/>
                        <GoogleSigninButton style={{
                            width: 48,
                            height: 48
                        }} size={GoogleSigninButton.Size.Icon} color={GoogleSigninButton.Color.Dark} onPress={this._signIn.bind(this)}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
};
