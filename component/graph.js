import React, {Component} from 'react';
import {View, Text, Navigator} from 'react-native';
import moment from 'moment'
import {StockLine} from 'react-native-pathjs-charts'
import * as action from '../services/pricehistroy';
var _ = require('lodash');

export class PieChartBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            min_value: "0"
        }
    }
    componentDidMount() {
        action.pricehistroy(this.props.id).then((dataPoints) => {
            let data = [];
            let set = [];
            data.push(dataPoints.map((dataPoint, idx) => {
                let time = dataPoint.timeslot,
                    yDataPoint = dataPoint.price
                set.push(yDataPoint)
                xDataPoint = moment(time, 'DD-MMM').unix() * 1000;
                return {xDataPoint, yDataPoint};
            }));
            var min_val = Math.min.apply(null, set) - 20
            this.setState({data: data, min_value: min_val});
        })
    }

    render() {
        let {data} = this.state;
        let {min_value} = this.state;
        let options = {
            width: 260,
            height: 150,
            min: min_value,
            color: '#01579b',
            margin: {
                top: 10,
                left: 28,
                bottom: 30,
                right: 15
            },
            animate: {
                type: 'delayed',
                duration: 1,
                fillTransition: 3
            },
            axisX: {
                showAxis: false,
                showLines: false,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                showAreas: false,
                strokeWidth: 0,
                labelFunction: ((v) => {
                    return moment(v).format('DD MMM')
                }),
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: false,
                showLabels: true,
                showTicks: true,
                zeroAxis: true,
                orient: 'left',
                showAreas: true,
                strokeWidth: 0,
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                {data
                    ? <StockLine data={data} options={options} xKey='xDataPoint' yKey='yDataPoint'/>
                    : null}
            </View>
        )
    }
}
