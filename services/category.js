import * as actions from './ajaxfire';

export function getCategory(subcategory) {
  return getLocalStorageData(subcategory).then((value) => {
    if (value === null || undefined) {
      return new Promise((resolve, reject) => {
        actions.ajaxFire('category_tree').then((val) => {
          const category = val.data;
          setLocalStorageData(subcategory, JSON.stringify(category));
          resolve(val.data);
        }, (error) => {
          reject(error);
        });
      });
    } else if (value !== null || undefined) {
      return new Promise((resolve, reject) => {
        let sub_cat = null;
        sub_cat = JSON.parse(value);
        resolve(sub_cat);
      });
    }
  });
}
