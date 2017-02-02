import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {map} from 'lodash'
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
    Image
} from 'react-native';
export class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    "image": require('../img/cat_icon/Mobiles.png'),
                    "name": "Mobiles & Tablets ",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/CameraAccessories.png'),
                    "name": "Camera & Accessories ",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/Laptops.png'),
                    "name": "Laptop & Desktop",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/KitchenAppliances.png'),
                    "name": "Kitchen Appliances ",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/HomeAppliances.png'),
                    "name": "Home Appliances",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/Television.png'),
                    "name": "TV & Home Audio",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/DesktopLaptopAccessories.png'),
                    "name": "Computer Accessories",
                    "pic": "ios-arrow-forward-outline"
                }, {
                    "image": require('../img/cat_icon/ComputerComponents.png'),
                    "name": "Computer Components",
                    "pic": "ios-arrow-forward-outline"
                }
            ])
        };
    }
    render() {
        console.log();
        var {width, height} = Dimensions.get('window');
        // let images = this._generateImages();
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#e3e0e0'
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} title='' style={styles.toolbar} titleColor='white' overflowIconName="md-more" actions={[
                    {
                        title: 'fav',
                        iconName: 'md-notifications',
                        iconSize: 25,
                        show: 'always'
                    }, {
                        title: 'Login',
                        iconSize: 25
                    }
                ]}></Icon.ToolbarAndroid>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        marginLeft: 15,
                        marginRight: 15,
                        marginTop: 10
                    }}>
                        <View style={{
                            flex: 1,
                            marginTop: 5,
                            backgroundColor: 'white'
                        }}>
                            <View style={{
                                flex: 1,
                                marginLeft: 20,
                                marginTop: 3,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Icon name="md-search" size={25} color="black" style={{
                                    flex: .1,
                                    marginLeft: 10,
                                    flexDirection: 'column',
                                    alignSelf: 'center'
                                }}/>
                                <TextInput autoCapitalize="words" style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    marginLeft: 8
                                }} underlineColorAndroid='rgba(0,0,0,0)' returnKeyType={"next"} placeholder={"Search product to get Lowest prize"} onChangeText={(text) => this.setState({name: text})}></TextInput>
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                marginTop: 5,
                                fontSize: 15
                            }}>Shop by Category</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            marginTop: 8,
                            marginBottom: 8,
                            flexDirection: 'column'
                        }}>

                            <ListView style={styles.container} dataSource={this.state.dataSource} renderRow={(data) => <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                justifyContent: 'space-around',
                                borderBottomWidth: 2,
                                borderBottomColor: '#e3e0e0'
                            }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    margin: 20
                                }}>
                                    <Image style={{
                                        flex: .2,
                                        alignSelf: 'center'
                                    }} resizeMode="contain" source={data.image}></Image>
                                    <Text style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignSelf: 'center',
                                        marginTop: 2,
                                        marginLeft: 10
                                    }}>{data.name}</Text>
                                    <Icon name="ios-arrow-forward-outline" size={25} color="#e3e0e0" style={{
                                        marginRight: 10
                                    }}/>
                                </TouchableOpacity>
                            </View>}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    toolbar: {
        height: 50,
        backgroundColor: '#085394'
    }
});
