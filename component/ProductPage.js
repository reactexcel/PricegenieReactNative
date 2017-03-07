import React, {Component} from 'react';
var style = require('../style/basicStyle');
import '../style/basicStyle'
import Buttons_data from '../data/buttons';
import {SegmentedControls} from 'react-native-radio-buttons'
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
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            animating: true,
            msg: false,
            page: 0,
            data: [],
            loader: true,
            shorting: "popularity",
            options: Buttons_data
        }
        this._previouspage = this._previouspage.bind(this);
        this._loadMore = this._loadMore.bind(this);
        this._footer = this._footer.bind(this);
        this.selectOption = this.selectOption.bind(this)
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    selectedProduct(data) {
        var id = data.href.split('/')[6];
        this.props.navigator.push({
            name: 'productview',
            payload: {
                id: id
            }
        })
    }
    componentWillMount(props) {
        actions.getProduct(this.props.name, this.props.id, this.props.sub_id, this.state.page, this.state.shorting).then((val) => {
            if (val.display_data && !val.display_data.length) {
                this.setState({msg: true});
            }
            this.setState({
                data: val.display_data,
                dataSource: this.state.ds.cloneWithRows(val.display_data),
                animating: false,
                filter: false
            })
        });
    }
    _loadMore() {
        var data = this.state.data
        actions.getProduct(this.props.name, this.props.id, this.props.sub_id, ++this.state.page, this.state.shorting).then((val) => {
            if (val.display_data && !val.display_data.length) {
                this.setState({loader: false});
            } else {
                this._footer()
                var dataSource = this.state.ds.cloneWithRows(data.concat(val.display_data));
                this.setState({
                    dataSource: dataSource,
                    page: this.state.page,
                    data: data.concat(val.display_data)

                });
            }
        })
    }
    _footer() {
        let {loader} = this.state;
        return (
            <View>{loader
                    ? <ActivityIndicator style={[
                            styles.centering, {
                                transform: [
                                    {
                                        scale: .7
                                    }
                                ]
                            }
                        ]} animating={this.state.load} color={STRING.BlueColor} size={32}/>
                    : null}</View>
        );
    }
    selectOption(options) {
        if (options.name == "Filter") {
            this.props.navigator.push({name: 'filter'})
        } else {
            let short = options.case, {name, sub_id, id} = this.props,
                opt = options.name
            component = this;
            this.setState({
                filter: true,
                shorting: short,
                loader: true,
                page: 0
            }, () => {
                actions.getProduct(name, id, sub_id, component.state.page, component.state.shorting,).then((val) => {
                    component.setState({
                        data: val.display_data,
                        dataSource: component.state.ds.cloneWithRows(val.display_data),
                        filter: false
                    })
                });
            });
        }
    }
    render() {
        var {height, width} = Dimensions.get('window');
        let {animating} = this.state;

        let {filter} = this.state;
        let {msg} = this.state;
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: STRING.GreyColor
                }}>
                    <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title='' style={style.toolbar} titleColor='white' overflowIconName="md-more" actions={[
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
                                <View>
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
                        : <View>
                            <View style={{
                                backgroundColor: 'white'
                            }}>
                                <View style={{
                                    padding: 5
                                }}>
                                    <SegmentedControls renderOption={(option, selected, onSelect, index) => {
                                        return <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center"
                                        }}>
                                            <View >
                                                <Text>{option.name}</Text>
                                            </View>
                                            <View style={{
                                                marginLeft: 2
                                            }}>
                                                <Icon {...option.icon}/>
                                            </View>
                                        </View>
                                    }} options={this.state.options} onSelection={this.selectOption} selectedOption={this.state.shorting} extractText={(option) => option.name}/>
                                </View>
                            </View>
                            <ScrollView >
                                {filter
                                    ? <View style={style.loder_inside}>
                                            <ActivityIndicator animating={this.state.filter} color={STRING.BlueColor} size="large"/>
                                        </View>
                                    : null}
                                <View style={{
                                    flex: 1,
                                    marginLeft: 6,
                                    marginRight: 6
                                }} elevation={15}>
                                    <ListView style={{
                                        height: height - 116
                                    }} dataSource={this.state.dataSource} renderFooter={this._footer} onEndReached={this._loadMore} initialListSize={4} onEndReachedThreshold={100} showsVerticalScrollIndicator={false} enableEmptySections={true} renderRow={(data, key) => <View key={key} style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        marginTop: 5,
                                        marginBottom: 1,
                                        paddingTop: 5,
                                        paddingRight: 10,
                                        paddingBottom: 10
                                    }} elevation={2}>
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
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
                                                        {data.name}
                                                    </Text>
                                                    <Text style={{
                                                        color: STRING.YelloColor,
                                                        fontSize: 12.5
                                                    }}>
                                                        From Rs: {data.num_price}
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
                                        </View>
                                    </View>}/>
                                </View>
                            </ScrollView>
                        </View>}
                </View>
                {animating
                    ? <View style={style.loder}>
                            <ActivityIndicator animating={this.state.animating} color={STRING.BlueColor} size="large"/>
                        </View>
                    : null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
});;
