import axios from 'axios';

export function ajaxFire(params) {
  return new Promise((resolve, reject) => {
    const url = CONFIG.baseURL + params;
    axios.get(url).then((data) => {
      resolve(data);
    }, (error) => {
      console.log(error);
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
