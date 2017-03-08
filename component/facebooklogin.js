import React, {PropTypes, Component} from 'react';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import {View, Text, Button, ScrollView} from 'react-native'
export class Login extends Component {
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
                        <FBLogin style={{}} onpress={(fbLogin) => {
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
                    </View>
                </ScrollView>
            </View>
        );
    }
};
