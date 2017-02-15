import * as actions from './ajaxfire'
global.product = [];
global.idCheck = null;
export function getProduct(name, id, sub_id, page) {
    return new Promise((resolve, reject) => {
        if (idCheck == id && page == 1) {
            resolve(product);
        } else {
            if (idCheck !== id) {
                product = [];
            }
            actions.ajaxFire("all_products&catalog/xxx/" + id + "/" + sub_id + "/json__true=&id=" + id + "&sub_id=" + sub_id + "&category=" + name + "&json=true&cat_id=" + id + "&sub_cat_id=" + sub_id + "&page=" + page).then((val) => {
                product = product.concat(val.data.display_data);
                idCheck = id;
                resolve(product);
            }, (error) => {
                reject(error)
            })
        }
    });
}
