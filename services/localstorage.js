import {AsyncStorage} from 'react-native';
getLocalStorageData = function(key, callback) {
    return new Promise(function(resolve, reject) {
        let store = AsyncStorage.getItem(key);
        store.then((value) => {
            if (value === null || undefined) {
                callback();
                reject();
            } else if (value !== null || undefined) {
                resolve(value);
            }
        });
    });
}

setLocalStorageData = function(key, value) {
    let val = null;
    if (typeof value === "object" || typeof value === "array") {
        val = JSON.stringify(value);
    } else if (typeof value === "boolean") {
        val = value.toString();
    }
    return AsyncStorage.setItem(key, (val || value));
}
