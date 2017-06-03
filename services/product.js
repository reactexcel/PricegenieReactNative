import * as actions from './ajaxfire';
export function getProduct(name, id, sub_id, page, popularity) {
  return new Promise((resolve, reject) => {
    actions.ajaxFire(`all_products&actual_link=log/xxx/${id}/${sub_id}/json__true=&id=${id}&sub_id=${sub_id}&category=${name}&json=true&cat_id=${id}&sub_cat_id=${sub_id}&sort=${popularity}&page=${page}`).then((val) => {
      const product = val.data;
      setLocalStorageData('Api_data', JSON.stringify(val.data));
      setLocalStorageData('filter_brands', JSON.stringify(val.data.brands));
      setLocalStorageData('filter_range', JSON.stringify(val.data.ranges));
      if (!val.data.filters) {
        setLocalStorageData('filter', null);
      } else {
        setLocalStorageData('filter', JSON.stringify(val.data.filters));
      }
      resolve(product);
    }, (error) => {
      reject(error);
    });
  });
}
