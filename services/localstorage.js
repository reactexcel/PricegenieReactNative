import {AsyncStorage} from 'react-native';
getLocalstoragedata = function(key) {
    return AsyncStorage.getItem(key)
}
setLocalstoragedata = function(key) {
    return AsyncStorage.setItem(key)
}
