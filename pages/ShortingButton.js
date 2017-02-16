import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
var _ = require('lodash');
import button_data from '../data/button';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

export class ShortingButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            button: button_data,
            active: 'popularity'
        }
    }
    render() {
        let buttons = [];
        buttons = _.map(this.state.button, (button, i) => {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({active: button.case}),
                    this.props.onPressSingleRequest(button)
                }} key={i} style={{
                    flex: 1
                }}>
                    <View style={this.state.active === button.case
                        ? styles.selected
                        : styles.unselected}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 12
                            }}>{button.name}</Text>
                        </View>
                        <View style={{
                            marginTop: 1.5
                        }}>
                            <Icon size={16} name={button.icon}/>
                        </View>
                    </View>
                </TouchableOpacity>

            );
        })
        return (
            <View style={{
                backgroundColor: '#e3e0e0',
                flexDirection: 'row',
                padding: 4
            }} elevation={3}>
                {buttons}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    unselected: {
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#e3e0e0',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 8
    },
    selected: {
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: '#e3e0e0',
        borderColor: '#c5c3c3',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 8

    }
});
