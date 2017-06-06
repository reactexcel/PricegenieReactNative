import { AsyncStorage } from 'react-native';

getLocalStorageData = function (key) {
  return AsyncStorage.getItem(key);
};

setLocalStorageData = function (key, value) {
  let val = null;
  if (typeof value === 'object' || typeof value === 'array') {
    val = JSON.stringify(value);
  } else if (typeof value === 'boolean') {
    val = value.toString();
  }
  return AsyncStorage.setItem(key, (val || value));
};
