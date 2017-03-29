import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export function google() {
    return new Promise((resolve, reject) => {
        GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
            // play services are available. can now configure library
            GoogleSignin.configure({}).then(() => {
                // you can now call currentUserAsync()
                console.log('here');
                GoogleSignin.currentUserAsync().then((user) => {
                    if (user) {
                        resolve(user);
                    } else {
                        console.log('user not found');
                        GoogleSignin.signIn().then((user) => {
                            resolve(user);
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                }).catch(() => {
                    reject('Could Not Get Current User')
                });
            }).catch(() => {
                reject('Configure Failed')
            });
        }).catch(() => {
            reject(new Error('Google Play Services Not Configured'))
        })
    })
}
