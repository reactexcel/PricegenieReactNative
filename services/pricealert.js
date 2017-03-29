import axios from "axios";

export function pricealert(productId, email) {
    console.log(productId, email);
    return axios.post('http://144.76.34.244:5005/v2/genie_alerts/set_genie_alert/', {
        mongo_id: productId,
        website: 'pricegenie',
        email_id: email
    }).then(function(response) {
        return (response.data)
    }).catch(function(error) {
        return (error)
    });
};
