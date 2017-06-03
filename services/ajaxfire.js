import axios from 'axios';

export function ajaxFire(params) {
  return new Promise((resolve, reject) => {
    console.log(CONFIG.baseURL + params);
    axios.get(CONFIG.baseURL + params).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}
export function priceGraph(params) {
  return new Promise((resolve, reject) => {
    axios.get(CONFI.baseURL + params).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}
