import React, {Component} from 'react';
var style = require('../style/basicStyle');
import '../style/basicStyle'
import * as actions from '../services/product';
import Icon from 'react-native-vector-icons/Ionicons';
var _ = require('lodash');
import {
    View,
    Text,
    StyleSheet,
    ToolbarAndroid,
    Dimensions,
    ListView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ViewPagerAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons'
var {height, width} = Dimensions.get('window');
export class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: true,
            filter_data: true,
            msg: true,
            options: [],
            rangesOptn: [],
            filter_option: ["Brands", "Price Ranges"]
        }
        this.selectFilter = this.selectFilter.bind(this)
    }
    componentDidMount() {
        getLocalStorageData("filter_brands").then((value) => {
            this.setState({options: JSON.parse(value)})
        })
        getLocalStorageData("filter").then((value) => {
            let fil_array = JSON.parse(value);
            if (fil_array !== null) {
                var fill_object = Object.keys(fil_array);
                let {filter_option} = this.state;
                _.forEach(fill_object, (object) => {
                    var object_array = object.split('_');
                    var array = _.map(object_array, (str) => {
                        return str.charAt(0).toUpperCase() + str.slice(1)
                    }).join(" ");
                    filter_option.push(array);
                })
                this.setState({filter_option});
            }
        })
    }
    renderOptions(option, selected, onSelect, index) {
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={style.unselectView}>
                    <Text style={{
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        {option}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    renderRanges(option, selected, onSelect, index) {
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={{
                    flexDirection: 'column',
                    borderBottomWidth: 1,
                    borderBottomColor: STRING.GreyColor
                }}>
                    <View style={{
                        padding: 8,
                        flexDirection: 'row'
                    }}>
                        <Icon size={20} name="ios-radio-button-on" backgroundColor={STRING.LightColor}/>
                        <Text style={{
                            marginLeft: 5
                        }}>Rs.{option.low}
                            -</Text>
                        <Text style={{
                            marginLeft: 5
                        }}>Rs.{option.high}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    renderOption(option, selected, onSelect, index) {
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={{
                    flexDirection: 'column',
                    borderBottomWidth: 1,
                    borderBottomColor: STRING.GreyColor
                }}>
                    <View style={{
                        padding: 8,
                        flexDirection: 'row'
                    }}>
                        <Icon size={20} name="ios-radio-button-on" backgroundColor={STRING.LightColor}/>
                        <Text style={{
                            marginLeft: 5
                        }}>{option.name
                                ? option.name
                                : option.text}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    selectFilter(object) {
        let {options} = this.state;
        getLocalStorageData("Api_data").then((value) => {
            let filter_data = JSON.parse(value);
            if (object == "Brands") {
                this.setState({filter_data: true, msg: true, options: filter_data.brands})
            } else if (object == "Price Ranges") {
                this.setState({msg: false, rangesOptn: filter_data.ranges})
            } else {
                fil_optn = [];
                filter_data = filter_data.filters;
                var opt = object.toLowerCase()
                var opt1 = opt.replace(/ /gi, "_");
                for (var filterKey in filter_data) {
                    if (filterKey == opt1) {
                        for (var filterValue in filter_data[filterKey]) {
                            if (_.isArray(filter_data[filterKey][filterValue])) {
                                _forEach(filter_data[filterKey][filterValue], (value) => {})
                            } else if (_.isObject(filter_data[filterKey][filterValue])) {
                                fil_optn.push(filter_data[filterKey][filterValue])
                            }
                        }
                        this.setState({msg: true, options: fil_optn})
                        break;
                    }
                }
            }
        });
    }
    render() {
        let {msg} = this.state
        return (
            <View style={{
                flex: 1
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more"></Icon.ToolbarAndroid>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: .6,
                        backgroundColor: STRING.GreyColor
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <RadioButtons options={this.state.filter_option} onSelection={this.selectFilter} selectedOption={this.state.selectedOptions} renderOption={this.renderOptions} extractText={(option) => option.name}/>
                        </ScrollView>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {msg
                                ? <RadioButtons options={this.state.options} onSelection={this.selectOption} renderOption={this.renderOption} extractText={(option) => {
                                        option.name,
                                        option.text
                                    }}/>
                                : <RadioButtons options={this.state.rangesOptn} onSelection={this.selectOption} renderOption={this.renderRanges} extractText={(option) => {
                                    option.high,
                                    option.low
                                }}/>}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
    unselectView: {
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    unselectText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    selectView: {
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    selectText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'green'
    }
});
