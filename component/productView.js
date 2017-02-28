import React, {Component} from 'react';
var style = require('../style/basicStyle');
import '../style/basicStyle'
import Icon from 'react-native-vector-icons/Ionicons';
var _ = require('lodash');
import Button from 'react-native-button';
import * as action from '../services/viewProduct';
import {
    View,
    Text,
    Image,
    ScrollView,
    Linking,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    ListView
} from 'react-native'

export class ProductView extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            result: [],
            specficiation: [],
            loading: true,
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            data: []
        }
        this._previouspage = this._previouspage.bind(this);
        this.selectedProduct = this.selectedProduct.bind(this);
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    selectedProduct(data) {
        this.setState({loading: true})
        action.renderProduct(data.query_id).then((val) => {
            this.setState({result: val.result, specficiation: val, loading: false})
        })
        action.relatedProduct(data.query_id).then((val) => {
            this.setState({
                dataSource: this.state.ds.cloneWithRows(val.related)
            })
        })
    }
    pressButton(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }
    componentDidMount(props) {
        action.renderProduct(this.props.id).then((val) => {
            this.setState({result: val.result, specficiation: val, loading: false})
        })
        action.relatedProduct(this.props.id).then((val) => {
            this.setState({
                dataSource: this.state.ds.cloneWithRows(val.related)
            })
        })
    }
    render() {
        var {height, width} = Dimensions.get('window');
        let {loading} = this.state;
        let result_data = this.state.result;
        let spec_data = this.state.specficiation;
        let spec_detail = _.map(spec_data.spec_detail, (test, key) => {
            if (key < 4) {
                var str = test.name;
                var key_name = str.trim();
                return (
                    <View style={{
                        flexDirection: 'row'
                    }} key={key}>
                        <Icon size={20} name="ios-checkmark"/>
                        <Text style={{
                            marginLeft: 5,
                            marginRight: 20,
                            fontSize: 12
                        }}>{key_name}</Text>
                    </View>
                );
            }
        })
        let product_data = _.map(result_data, (data, key) => {
            return (
                <View key={key} style={{
                    marginTop: 5,
                    borderTopWidth: 1,
                    borderTopColor: STRING.GreyColor
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
                            uri: data.image
                        }}></Image>
                        <View style={{
                            flex: 1,
                            marginTop: 10,
                            marginLeft: 5,
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>{data.name}</Text>
                            <Text style={{
                                fontSize: 14.5,
                                fontWeight: 'bold'
                            }}>Rs. {data.price}</Text>
                            <View style={{
                                marginTop: 13,
                                width: 90,
                                height: 45
                            }}>
                                <Button containerStyle={{
                                    padding: 4.5,
                                    height: 25,
                                    borderRadius: 3,
                                    backgroundColor: STRING.RedColor
                                }} style={{
                                    fontSize: 11,
                                    color: 'white'
                                }} styleDisabled={{
                                    color: 'blue'
                                }} onPress={() => {
                                    this.pressButton(data.url)
                                }}>
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
                            uri: data.logo
                        }}></Image>
                        <TouchableOpacity onPress={() => {
                            this.callVaiant()
                        }}>
                            {data.varient_data.data
                                ? <Text style={{
                                        marginLeft: 38,
                                        fontSize: 11
                                    }}>
                                        {`${data.varient_data.data.length} Varient`}
                                    </Text>
                                : <Text style={{
                                    marginLeft: 38,
                                    fontSize: 11
                                }}></Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            );
        })
        return (
            <View style={{
                flex: 1,
                backgroundColor: STRING.GreyColor,
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
                ]} elevation={4}></Icon.ToolbarAndroid>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {loading
                        ? <ActivityIndicator style={{
                                height: height - 90
                            }} animating={this.state.load} color={STRING.BlueColor} size={32}/>
                        : <View style={{
                            flex: 1
                        }}>
                            <View style={{
                                flex: 1,
                                backgroundColor: 'white'
                            }} elevation={4}>
                                <Text style={{
                                    paddingTop: 5,
                                    paddingLeft: 5,
                                    fontWeight: 'bold',
                                    color: STRING.LightBlackColor
                                }}>
                                    {spec_data.name_text}
                                </Text>
                                <View style={{
                                    marginLeft: 17.5,
                                    paddingLeft: 11,
                                    paddingTop: 4,
                                    paddingBottom: 14,
                                    flexDirection: 'row'
                                }}>
                                    <Image style={{
                                        marginTop: 4,
                                        height: 100,
                                        width: 100
                                    }} resizeMode="contain" source={{
                                        uri: spec_data.spec_image
                                    }}></Image>
                                    <View style={{
                                        flex: 1,
                                        marginLeft: 15,
                                        flexDirection: 'column'
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: STRING.LightBlackColor
                                        }}>
                                            Key Features
                                        </Text>
                                        <View style={{
                                            flexDirection: 'column'
                                        }}>
                                            {spec_detail}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                flex: 1.3,
                                backgroundColor: 'white',
                                marginLeft: 9,
                                marginRight: 9,
                                marginTop: 9
                            }} elevation={4}>
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
                                            color: STRING.LightBlackColor,
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>
                                            COMPARE PRICES
                                        </Text>
                                    </View>
                                    {product_data}
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                marginLeft: 9,
                                marginRight: 9
                            }}>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                    marginTop: 10,
                                    marginBottom: 1,
                                    paddingTop: 5,
                                    paddingRight: 10,
                                    paddingBottom: 10,
                                    marginBottom: 10
                                }} elevation={4}>
                                    <Text style={{
                                        padding: 5,
                                        fontWeight: 'bold'
                                    }}>
                                        YOU MAY ALSO LIKE
                                    </Text>
                                    <ListView style={{
                                        height: height - 150
                                    }} dataSource={this.state.dataSource} initialListSize={4} enableEmptySections={true} renderRow={(data, key) => <View key={key} style={{
                                        marginTop: 5,
                                        marginLeft: 5,
                                        marginRight: 1,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        borderTopWidth: 1,
                                        borderTopColor: STRING.GreyColor
                                    }}>
                                        <TouchableOpacity onPress={() => this.selectedProduct(data)} style={{
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
                                                uri: data.image
                                            }}></Image>
                                            <View style={{
                                                flex: 1
                                            }}>
                                                <Text style={{
                                                    color: STRING.LightBlackColor,
                                                    fontSize: 13
                                                }}>
                                                    {data.full_name}
                                                </Text>
                                                <Text style={{
                                                    color: STRING.YelloColor,
                                                    fontSize: 12.5
                                                }}>
                                                    From Rs: {data.price}
                                                </Text>
                                                <Text style={{
                                                    fontSize: 12
                                                }}>
                                                    {`${data.sellers} Sellers`}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                            marginTop: 50
                                        }}>
                                            <Icon size={20} name="ios-heart-outline" backgroundColor={STRING.LightColor}/>
                                        </TouchableOpacity>
                                    </View>}/>
                                </View>
                            </View>
                        </View>}
                </ScrollView>
            </View>
        );
    }
}