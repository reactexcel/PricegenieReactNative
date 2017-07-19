import React from 'react';
import { Platform } from 'react-native';
import { FBLoginManager } from 'react-native-facebook-login';
import axios from 'axios';

export function facebooksignin() {
  if (Platform.OS === 'ios') {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions((['public_profile', 'email']), (error, data) => {
        if (!error) {
          const newData = [];
          const api = `https://graph.facebook.com/v2.3/${data.credentials.userId}?fields=name,email,first_name,last_name,age_range,link,picture,gender,locale,timezone,verified&access_token=${data.credentials.token}`;
          axios.get(api).then((response) => {
            const profiledata = response.data;
            const profile = JSON.stringify(profiledata);
            newData.push({ credentials: data.credentials, missingPermissions: data.missingPermissions, profile, provider: 'facebook', type: 'success' });
            resolve(newData[0]);
          }, (error) => { reject(error); });
        } else {
          reject(error);
        }
      });
    });
  } else if (Platform.OS === 'android') {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions((['public_profile', 'email']), (error, data) => {
        if (!error) {
          resolve(data);
        } else {
          reject(error);
        }
      });
    });
  }
}

export function facebooksignout() {
  return new Promise((resolve, reject) => {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        resolve(data);
      } else {
        reject(error);
      }
    });
  });
}
