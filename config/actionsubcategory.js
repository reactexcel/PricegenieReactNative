import axios from "axios";

export function category() {
    return new Promise(function(resolve, reject) {
        return axios.get('http://pricegenie.co/mobile_api/api.php?action=category_tree').then((data) => {
            resolve(data)
            console.log(data);
        }, (error) => {
            reject(error)
        })
    })
};
