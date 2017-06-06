import { FBLoginManager } from 'react-native-facebook-login';


export function facebooksignin() {
  FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
  return new Promise((resolve, reject) => {
    FBLoginManager.loginWithPermissions((["email"]),(error, data) => {
      if (!error) {
        resolve(data);
      } else {
        reject(error);
      }
    });
  });
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
