/* eslint-disable no-shadow*/
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export function google() {
  return new Promise((resolve, reject) => {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
      GoogleSignin.configure({}).then(() => {
                // you can now call currentUserAsync()
        GoogleSignin.currentUserAsync().then((user) => {
          if (user) {
            resolve(user);
          } else {
            GoogleSignin.signIn().then((user) => {
              resolve(user);
            }).catch((err) => {
              reject(err);
            });
          }
        }).catch(() => {
          reject('Could Not Get Current User');
        });
      }).catch(() => {
        reject('Configure Failed');
      });
    }).catch(() => {
      reject(new Error('Google Play Services Not Configured'));
    });
  });
}
export function googleSignOut() {
  return new Promise((resolve, reject) => {
    GoogleSignin.configure({}).then(() => {
      GoogleSignin.signOut().then(() => {
        const out = true;
        resolve(out);
      }).catch((err) => {
        reject(err);
      });
    });
  }).catch(() => {
    reject('Configure Failed');
  });
}
