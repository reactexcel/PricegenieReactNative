import axios from 'axios';

export function unsetalert(productId, email) {
  return axios.post(UNSETALERT.baseURL, {
    mongo_id: productId,
    website: 'pricegenie',
    email_id: email,
  }).then(response => (response.data)).catch(error => (error));
}
