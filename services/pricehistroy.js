import * as actions from './ajaxfire'
export function pricehistroy(id) {
    return new Promise(function(resolve, reject) {
        actions.priceGraph("dailylowest&query_id=" + id + "&resource=mobile_api&result_show=json").then((val) => {
            resolve(val.data.json_dataProvider)
        }, (error) => {
            reject(error)
        })
    })
}
