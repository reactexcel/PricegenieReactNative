import React, { Component } from 'react';
import style from '../../style/basicStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';
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
import * as actions from '../../services/category';
import * as action from '../../services/google';
import * as facebook from '../../services/facebook';

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
    const sub_name = this.props.navigation.state.params.name;
    this.setState({ subcat: sub_name });
    actions.getCategory('subcategory').then((data) => {
      if (data && data.length) {
        this.setState({ arrcat: data, animating: false });
      }
    });
  }


  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }
  _previouspage() {
    this.props.navigation.goBack();
  }
  _onPressSingleRequest(data) {
    const cat_name = data.cat_name;
    const cat_id = data.cat_id;
    const sub_cat_id = data.sub_cat_id;
    this.props.navigation.navigate('productPage',
      {
        name: cat_name,
        id: cat_id,
        sub_id: sub_cat_id,
      },
    );
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Icon name={'ios-list'} size={28} style={{ marginRight: 15, color: 'white', alignSelf: 'center' }} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    title: <Text style={{ fontSize: 15, alignSelf: 'center', color: 'white' }} >
      { navigation.state.params.name}
    </Text>,
    headerLeft: <View style={{ flexDirection: 'row' }}>
      <Icon name={'ios-arrow-back-outline'} size={30} style={{ color: 'white', marginLeft: 15, paddingRight: 15, alignSelf: 'center' }} onPress={() => { navigation.goBack(); }} />
      <Image source={require('../../img/genie-logo-g.png')} size={20} /></View>,
    headerStyle: style.toolbar,
  });
  render() {
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
                name="ios-arrow-forward-outline" size={25} color={'#e3e0e0'} style={{
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
            <ActivityIndicator animating={this.state.animating} color='#01579b' size="large" />
          </View>
          : null}
      </View>
    );
  }
}
