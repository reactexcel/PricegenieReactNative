import React, {Component} from 'react';
var style = require('../style/basicStyle');
import '../style/basicStyle'
import Icon from 'react-native-vector-icons/Ionicons';
var _ = require('lodash');
import Button from 'react-native-button';
import {View, Text, Image, ScrollView} from 'react-native'

export class ProductView extends Component {
    constructor(props) {
        super(props)
        this._previouspage = this._previouspage.bind(this)
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    pressButton() {}
    componentDidMount() {}
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#e3e0e0',
                flexDirection: 'column'
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more" actions={[
                    {
                        title: 'Login',
                        iconSize: 25
                    }, {
                        title: 'Search',
                        iconSize: 25,
                        iconName: 'md-search',
                        show: 'always'
                    }, {
                        title: 'fav',
                        iconSize: 25,
                        iconName: 'md-heart',
                        show: 'always'
                    }
                ]}></Icon.ToolbarAndroid>
                <ScrollView>
                    <View style={{
                        flex: 1.3,
                        backgroundColor: 'white',
                        marginLeft: 9,
                        marginRight: 9,
                        marginTop: 9
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginLeft: 28,
                            marginRight: 28,
                            marginTop: 9,
                            marginBottom: 9
                        }}>
                            <View >
                                <Text style={{
                                    color: '#54575a',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    COMPARE PRICES
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 5,
                                borderTopWidth: 1,
                                borderTopColor: '#e3e0e0'
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <Image style={{
                                        marginTop: 13,
                                        marginLeft: 3,
                                        borderColor: 'red',
                                        height: 75,
                                        width: 75
                                    }} resizeMode="contain" source={{
                                        uri: "https://assetscdn.paytm.com/images/catalog/product/M/MO/MOBAPPLE-IPHONEMAST445321D980C6B/2.jpg"
                                    }}></Image>
                                    <View style={{
                                        flex: 1,
                                        marginTop: 10,
                                        marginLeft: 5,
                                        flexDirection: 'column'
                                    }}>
                                        <Text style={{
                                            fontSize: 14
                                        }}>
                                            Apple iPhone 6S Plus 128 GB (Gold)
                                        </Text>
                                        <Text style={{
                                            fontSize: 14.5,
                                            fontWeight: 'bold'
                                        }}>Rs. 78799</Text>
                                        <View style={{
                                            marginTop: 13,
                                            width: 90,
                                            height: 45
                                        }}>
                                            <Button containerStyle={{
                                                padding: 4.5,
                                                height: 25,
                                                borderRadius: 3,
                                                backgroundColor: '#F44336'
                                            }} style={{
                                                fontSize: 11,
                                                color: 'white'
                                            }} styleDisabled={{
                                                color: 'blue'
                                            }} onPress={this.pressButton}>
                                                BUY NOW
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    marginBottom: 10,
                                    flexDirection: 'row'
                                }}>
                                    <Image style={{
                                        height: 17,
                                        width: 44
                                    }} resizeMode="contain" source={{
                                        uri: "http://pricegenie.co/img/logos/paytm.png"
                                    }}></Image>
                                    <Text style={{
                                        marginLeft: 38,
                                        fontSize: 11
                                    }}>
                                        3 Variant
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
