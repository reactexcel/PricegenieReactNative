import * as actions from './ajaxfire'
import moment from 'moment'
export function pricehistroy(id) {
    return new Promise(function(resolve, reject) {
        actions.priceGraph("dailylowest&query_id=" + id + "&resource=mobile_api&result_show=json").then((val) => {
            let data = [];
            data.push(val.data.json_dataProvider.map((dataPoint, idx) => {
                let time = dataPoint.timeslot,
                    yDataPoint = dataPoint.price
                xDataPoint = moment(time, 'DD-MMM').unix();
                return {xDataPoint, yDataPoint};
            }));
            resolve(data)
        }, (error) => {
            reject(error)
        })
    })
}
