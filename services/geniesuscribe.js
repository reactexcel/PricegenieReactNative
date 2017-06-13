import axios from 'axios';

export function suscribelist(email) {
  return axios.post(SUBSCRIBE.baseURL + email).then(response => (response.data))
  .catch(error => (error));
}
