import React, {Component} from 'react';
var style = require('../style/basicStyle');
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../services/product';
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

export class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            animating: true,
            msg: false,
            color: '#36393b'
        }
        this._previouspage = this._previouspage.bind(this);
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    componentDidMount(props) {
        actions.getProduct(this.props.name, this.props.id, this.props.sub_id).then((val) => {
            if (val.display_data && !val.display_data.length) {
                this.setState({msg: true});
            }
            this.setState({product: val.display_data, animating: false})
        });
    }
    render() {
        var {height, width} = Dimensions.get('window');
        let prod = this.state.product;
        let {animating} = this.state;
        let {msg} = this.state;
        let product = _.map(prod, (productView, i) => {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    marginBottom: 5,
                    paddingTop: 5,
                    paddingRight: 10,
                    paddingBottom: 10
                }} elevation={3} key={i}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <Image style={{
                                flex: .3,
                                height: 45,
                                width: 45
                            }} resizeMode="contain" source={{
                                uri: productView.image
                            }}></Image>
                            <View style={{
                                flex: 1
                            }}>
                                <Text style={{
                                    color: '#36393b',
                                    fontSize: 13
                                }}>
                                    {productView.name}
                                </Text>
                                <Text style={{
                                    color: '#e3ae22'
                                }}>
                                    From Rs:{productView.num_price}
                                </Text>
                                <Text>
                                    {productView.sellers}
                                    Sellers
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginTop: 50
                        }}>
                            <Icon size={20} name="md-heart" backgroundColor="red"/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        })
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#e3e0e0'
                }}>
                    <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} elevation={3} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more" actions={[
                        {
                            title: 'Login',
                            iconSize: 25
                        }, {
                            title: 'fav',
                            iconSize: 25,
                            iconName: 'md-notifications',
                            show: 'always'
                        }, {
                            title: 'Search',
                            iconSize: 25,
                            iconName: 'md-search',
                            show: 'always'
                        }
                    ]}></Icon.ToolbarAndroid>
                    {msg
                        ? <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                height: height,
                                justifyContent: 'space-around'
                            }}>
                                <View style>
                                    <Text style={{
                                        padding: 10,
                                        borderRadius: 10,
                                        backgroundColor: 'white',
                                        margin: 10
                                    }}>
                                        Sorry!!!!No Product Found
                                    </Text>
                                </View>
                            </View>
                        : null}
                    <ScrollView onScroll={() => {
                        console.log('test');
                    }} scrollEventThrottle={200}>
                        <View style={{
                            flex: 1,
                            marginLeft: 6,
                            marginRight: 6,
                            marginBottom: 6,
                            marginTop: 15
                        }}>
                            {product}
                        </View>
                    </ScrollView>
                </View>
                {animating
                    ? <View style={style.loder}>
                            <ActivityIndicator animating={this.state.animating} color="#01579b" size="large"/>
                        </View>
                    : null}
            </View>
        );
    }
}
