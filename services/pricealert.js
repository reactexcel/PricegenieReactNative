import axios from 'axios';

export function pricealert(productId, email) {
  return axios.post(CONFIGURE.baseURL, {
    mongo_id: productId,
    website: 'pricegenie',
    email_id: email,
  }).then(response => (response.data)).catch(error => (error));
}
