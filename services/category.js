import axios from "axios";
import {CONFIG} from '../config/config'
export function category() {
    return new Promise(function(resolve, reject) {
        return axios.get(CONFIG.url).then((data) => {
            resolve(data)
        }, (error) => {
            reject(error)
        })
    })
};
