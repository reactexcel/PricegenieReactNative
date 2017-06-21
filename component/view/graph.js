/* eslint-disable import/prefer-default-export*/
import React, { Component } from 'react';
import { View, Text, Navigator, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';
import { StockLine } from 'react-native-pathjs-charts';
import * as action from '../../services/pricehistroy';

const _ = require('lodash');
const { height, width } = Dimensions.get('window');

export class PieChartBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      priceData: null,
      min_value: '0',
      max: 0,
    };
    this.handleMaxValue = this.handleMaxValue.bind(this);
  }
  componentWillMount() {
    this.setState({ data: this.props.data });
    this.handleMaxValue();
  }
  handleMaxValue() {
    const max_calc = _.map(this.props.data[0], (data) => {
      let ymax = 0;
      if (ymax < data.yDataPoint) {
        ymax = data.yDataPoint;
        return ymax;
      }
    });
    const maxValue = _.max(max_calc);

    if (maxValue < 1000) {
      this.setState({ max: maxValue + 100 });
    } else if (maxValue > 1000 && maxValue < 5000) {
      this.setState({ max: maxValue + 1000 });
    } else if (maxValue > 5000 && maxValue < 10000) {
      this.setState({ max: maxValue + 2000 });
    } else if (maxValue > 10000) {
      this.setState({ max: maxValue + 5000 });
    }
  }
  render() {
    const { data } = this.state;
    const { min_value } = this.state;
    const options = {
      width: 295,
      height: height - 520,
      min: 0,
      max: this.state.max,
      color: '#01579b',
      margin: {
        top: 20,
        left: 30,
        bottom: 20,
        right: 50,
      },
      animate: {
        type: 'delayed',
        duration: 1,
        fillTransition: 2,
      },
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        showAreas: false,
        strokeWidth: 0,
        labelFunction: (v => moment(v * 1000).format('DD MMM')),
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        },
      },
      axisY: {
        showAxis: false,
        showLines: false,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        showAreas: true,
        strokeWidth: 0,
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        },
      },
    };

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}
      >
        {data
          ?
            <StockLine data={data} options={options} xKey="xDataPoint" yKey="yDataPoint" />
        : null}
      </View>
    );
  }
}
PieChartBasic.propTypes = {
  data: React.PropTypes.any.isRequired,
};
