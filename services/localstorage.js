import {AsyncStorage} from 'react-native';
getLocalstoragedata = function(key) {
    return AsyncStorage.getItem(key)
}
setLocalstoragedata = function(key, value) {
    let val = null;
    if (typeof value === "object" || typeof value === "array") {
        val = JSON.stringify(value);
        console.log(val);
    } else if (typeof value === "boolean") {
        val = value.toString();
    }
    return AsyncStorage.setItem(key, (val || value));
}
