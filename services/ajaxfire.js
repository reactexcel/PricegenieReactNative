import axios from "axios";
export function ajaxFire(params) {
    return new Promise(function(resolve, reject) {
        axios.get(CONFIG.baseURL + params).then((data) => {
            resolve(data)
        }, (error) => {
            reject(error)
        })
    })
};
