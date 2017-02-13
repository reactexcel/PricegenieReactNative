import * as actions from './ajaxfire'
export function getProduct(name, id, sub_id) {
    console.log(name, id, sub_id);
    return new Promise(function(resolve, reject) {
        actions.ajaxFire("all_products&catalog/xxx/" + id + "/" + sub_id + "/json__true=&id=" + id + "&sub_id=" + sub_id + "&category=" + name + "&json=true&cat_id=" + id + "&sub_cat_id=" + sub_id + "&page=1").then((val) => {
            var product = val.data;
            resolve(product)
        }, (error) => {
            reject(error)
        })
    });
}
