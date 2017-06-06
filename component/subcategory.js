import React, { Component } from 'react';
import '../style/basicStyle';
import Icon from 'react-native-vector-icons/Ionicons';
const _ = require('lodash');
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
    ToastAndroid,
    Image,
    ActivityIndicator,
} from 'react-native';
import * as actions from '../services/category';
import * as action from '../services/google';
import * as facebook from '../services/facebook';

const style = require('../style/basicStyle');

export class Subcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
    this.state = {
      subcat: '',
      arrcat: [],
      animating: true,
    };
    this._previouspage = this._previouspage.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }
  componentWillMount() {
    const sub_name = this.props.name;
    this.setState({ subcat: sub_name });
    actions.getCategory('subcategory').then((data) => {
      if (data && data.length) {
        this.setState({ arrcat: data, animating: false });
      }
    });
  }
  componentDidMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }

  openDrawer() {
    this.props.openstate();
  }
  _previouspage() {
    this.props.handleState(1);
    this.props.navigator.pop();
  }
  _onPressSingleRequest(data) {
    const cat_name = data.cat_name;
    const cat_id = data.cat_id;
    const sub_cat_id = data.sub_cat_id;
    this.props.navigator.push({
      name: 'productPage',
      payload: {
        name: cat_name,
        id: cat_id,
        sub_id: sub_cat_id,
      },
    });
  }
  render() {
    const button = (
      <Icon.ToolbarAndroid
        logo={require('../img/genie-logo-g.png')}
        onIconClicked={this._previouspage}
        navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white"
        // overflowIconName="ios-list"
        onActionSelected={() => {
          this.openDrawer();
        }}
        actions={[{
          title: 'Login',
          iconSize: 25,
          iconName: 'ios-list',
          show: 'always',
        },
        ]}
      >
        <View style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          borderWidth: 0,
          paddingLeft: width / 9,
          paddingTop: 15,
        }}
        >
          <Text style={{
            fontSize: 15,
            alignSelf: 'center',
            color: 'white',
          }}
          >
            {this.state.subcat}
          </Text>
        </View>
      </Icon.ToolbarAndroid>
        );
    const { height, width } = Dimensions.get('window');
    let catg = null;
    const sub_cat = this.state.arrcat;
    const { animating } = this.state;
    const now_cat = _.map(sub_cat, (user, index) => {
      if (user.key === this.state.subcat) {
        catg = _.map(user.data, (user_data, i) => (
          <View key={i} style={style.touch}>
            <TouchableOpacity
              onPress={() => this._onPressSingleRequest(user_data)} style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Text style={{
                flex: 1,
                flexDirection: 'column',
                margin: 10,
                alignSelf: 'center',
              }}
              >
                {user_data.cat_name}
              </Text>
              <Icon
                name="ios-arrow-forward-outline" size={25} color={STRING.GreyColor} style={{
                  margin: 10,
                }}
              />
            </TouchableOpacity>
          </View>
                ));
      }
    });
    return (
      <View style={{
        flex: 1,
      }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
        >
          {button}
          {/* <Icon.ToolbarAndroid
            logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white" overflowIconName="ios-list" actions={[{
              title: 'Login',
              iconSize: 25,
            },
            ]}
            >
            <View style={{
              flex: 1,
              alignSelf: 'center',
              borderWidth: 0,
              paddingLeft: width / 9,
              paddingTop: 15,
            }}
            >
              <Text style={{
                fontSize: 15,
                color: 'white',
              }}
              >
                {this.state.subcat}
              </Text>
            </View>
          </Icon.ToolbarAndroid> */}
          <ScrollView>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'white',
              justifyContent: 'space-around',
            }}
            >
              {catg}
            </View>
          </ScrollView>
        </View>
        {animating
          ? <View style={style.loder}>
            <ActivityIndicator animating={this.state.animating} color={STRING.BlueColor} size="large" />
          </View>
        : null}
      </View>
    );
  }
}
