import { FBLoginManager } from 'react-native-facebook-login';


export function facebooksignin() {
  return new Promise((resolve, reject) => {
    FBLoginManager.login((error, data) => {
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
