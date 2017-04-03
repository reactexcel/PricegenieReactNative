import axios from "axios";

export function pricealert(productId, email) {
    return axios.post(CONFIGURE.baseURL, {
        mongo_id: productId,
        website: 'pricegenie',
        email_id: email
    }).then(function(response) {
        return (response.data)
    }).catch(function(error) {
        return (error)
    });
};
