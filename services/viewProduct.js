import * as actions from './ajaxfire'
export function renderProduct(id) {
    return new Promise(function(resolve, reject) {
        actions.ajaxFire("product&query_id=" + id).then((val) => {
            resolve(val.data.data)
        }, (error) => {
            reject(error)
        })
    });
}
