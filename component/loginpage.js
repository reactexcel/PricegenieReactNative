import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {View, Text, Button} from 'react-native';

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
                flex: 1
            }}>
                <GoogleSigninButton style={{
                    width: 48,
                    height: 48
                }} size={GoogleSigninButton.Size.Icon} color={GoogleSigninButton.Color.Dark} onPress={this._google.bind(this)}/>
            </View>
        );
    }
}
