import React, {Component} from 'react';
import '../style/basicStyle'
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
    AsyncStorage,
    Image,
    ActivityIndicator
} from 'react-native';
var style = require('../style/basicStyle');
import * as actions from '../config/actionsubcategory';
import axios from "axios";
export class Subcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subcat: '',
            arrcat: [],
            animating: true
        }
        this._previouspage = this._previouspage.bind(this);
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    componentWillMount() {
        let sub_name = this.props.name;
        this.setState({subcat: sub_name});
        AsyncStorage.getItem("subcategory").then((value) => {
            if (value === null || undefined) {
                this._genrateSubcat()
            } else if (value != null || undefined) {
                this.setState({animating: false})
                AsyncStorage.getItem("subcategory").then((value) => {
                    let sub_cat = JSON.parse(value);
                    this.setState({arrcat: sub_cat})
                }).done();
            }
        }).done();
    }
    _genrateSubcat() {
        actions.category().then((val) => {
            var category = val.data;
            this.setState({arrcat: category, animating: false})
            AsyncStorage.setItem("subcategory", JSON.stringify(category));
        });
    }
    _onPressSingleRequest(data) {}
    render() {
        var {height, width} = Dimensions.get('window');
        let catg = null;
        let sub_cat = this.state.arrcat;
        let {animating} = this.state;
        let now_cat = _.map(sub_cat, (user, index) => {
            if (user.key === this.state.subcat) {
                catg = _.map(user.data, (user_data, i) => (
                    <TouchableOpacity key={i} onPress={() => this._onPressSingleRequest(user_data)} style={style.touch}>
                        <Text style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 10,
                            alignSelf: 'center'
                        }}>
                            {user_data.cat_name}
                        </Text>
                        <Icon name="ios-arrow-forward-outline" size={25} color="#e3e0e0" style={{
                            margin: 10
                        }}/>
                    </TouchableOpacity>
                ))
            }
        });
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white'
                }}>
                    <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more" actions={[{
                            title: 'Login',
                            iconSize: 25
                        }
                    ]}>
                        <View style={{
                            flex: 1,
                            alignSelf: 'center',
                            borderWidth: 0,
                            paddingLeft: width / 9,
                            paddingTop: 13
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: 'white'
                            }}>
                                {this.state.subcat}
                            </Text>
                        </View>
                    </Icon.ToolbarAndroid>
                    <ScrollView>

                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            justifyContent: 'space-around'
                        }}>
                            {catg}
                        </View>
                    </ScrollView>
                </View>
                {animating
                    ? <View style={{
                            height: height,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ddd'
                        }}>
                            <ActivityIndicator animating={this.state.animating} size="large"/>
                        </View>
                    : null}
            </View>
        );
    }
}
