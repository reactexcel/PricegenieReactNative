import * as actions from './ajaxfire';
export function renderScrapProduct(id) {
  return new Promise((resolve, reject) => {
    actions.ajaxFire(`get_scrap_product&id=${id}`).then((val) => {
      resolve(val.data.data);
    }, (error) => {
      reject(error);
    });
  });
}
