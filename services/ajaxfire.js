import axios from "axios";
export function ajaxFire() {
    return new Promise(function(resolve, reject) {
        axios.get(CONFIG.url).then((data) => {
            resolve(data)
        }, (error) => {
            reject(error)
        })
    })
};
