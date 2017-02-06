import React, {Component} from 'react';
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
    Image
} from 'react-native';
import axios from "axios";
export class Subcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subcat: '',
            arrcat: []
        }
        this._callBack = this._callBack.bind(this);
    }
    componentWillMount() {
        let sub_name = this.props.name;
        this.setState({subcat: sub_name});
        AsyncStorage.getItem("myKey").then((value) => {
            let sub_cat = JSON.parse(value);
            this.setState({arrcat: sub_cat})
        }).done();

    }
    _callBack() {
        this.props.navigator.pop({name: "home"})
    }
    _onPressSingleRequest(data) {}
    render() {
        console.log(this.state.subcat);
        var {height, width} = Dimensions.get('window');
        let catg = null;
        let sub_cat = this.state.arrcat;
        let now_cat = _.map(sub_cat, (user, index) => {
            console.log(user.key);
            if (user.key === this.state.subcat) {
                console.log(this.state.subcat);
                catg = _.map(user.data, (user_data, i) => (
                    <TouchableOpacity key={i} onPress={() => this._onPressSingleRequest(user_data)} style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderBottomWidth: 2,
                        borderBottomColor: '#e3e0e0'
                    }}>
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
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white'
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._callBack} navIconName="ios-arrow-back" title='' style={styles.toolbar} titleColor='white' overflowIconName="md-more" actions={[{
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
        );
    }
}
const styles = StyleSheet.create({
    toolbar: {
        height: 50,
        backgroundColor: '#085394'
    }
});
