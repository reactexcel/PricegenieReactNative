import React, {Component} from 'react';
var style = require('../style/basicStyle');
import '../style/basicStyle'
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
            page: 1,
            data: [],
            load: true
        }
        this._previouspage = this._previouspage.bind(this);
        this._loadMore = this._loadMore.bind(this);
        this._footer = this._footer.bind(this);
    }
    _previouspage() {
        this.props.navigator.pop()
    }
    componentDidMount(props) {
        actions.getProduct(this.props.name, this.props.id, this.props.sub_id, this.state.page,).then((val) => {
            if (val.display_data && !val.display_data.length) {
                this.setState({msg: true, load: false});
            }
            this.setState({
                data: val.display_data,
                dataSource: this.state.ds.cloneWithRows(val.display_data),
                animating: false
            })
        });
    }
    _loadMore() {
        var data = this.state.data
        actions.getProduct(this.props.name, this.props.id, this.props.sub_id, ++this.state.page,).then((val) => {
            if (val.display_data && !val.display_data.length) {
                this.setState({load: false});
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
        return (
            <View><ActivityIndicator style={[
                styles.centering, {
                    transform: [
                        {
                            scale: .7
                        }
                    ]
                }
            ]} animating={this.state.load} color="#01579b" size={32}/></View>
        );
    }
    render() {
        var {height, width} = Dimensions.get('window');
        let {animating} = this.state;
        let {msg} = this.state;
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#e3e0e0'
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
                        : null}
                    <ScrollView >
                        <View style={{
                            flex: 1,
                            marginLeft: 6,
                            marginRight: 6,
                            marginTop: 10
                        }} elevation={15}>
                            <ListView style={{
                                height: height - 86
                            }} dataSource={this.state.dataSource} renderFooter={this._footer} onEndReached={this._loadMore} initialListSize={5} onEndReachedThreshold={30} showsVerticalScrollIndicator={false} enableEmptySections={true} renderRow={(data, key) => <View style={{
                                flex: 1,
                                backgroundColor: 'white',
                                marginBottom: 5,
                                paddingTop: 5,
                                paddingRight: 10,
                                paddingBottom: 10
                            }} elevation={2}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }} key={key}>
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
                                            uri: data.image
                                        }}></Image>
                                        <View style={{
                                            flex: 1
                                        }}>
                                            <Text style={{
                                                color: '#36393b',
                                                fontSize: 13
                                            }}>
                                                {data.name}
                                            </Text>
                                            <Text style={{
                                                color: '#e3ae22',
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
                                        <Icon size={20} name="ios-heart-outline" backgroundColor="#3b5998"/>
                                    </TouchableOpacity>
                                </View>
                            </View>}/>
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
const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
});
