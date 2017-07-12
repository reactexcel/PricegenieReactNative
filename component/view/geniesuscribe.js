import React, { Component } from 'react';
import style from '../../style/basicStyle';
import {
    View,
    Text,
    ActivityIndicator,
    ListView,
    ToastAndroid,
    TouchableOpacity,
    Image,
    ToolbarAndroid,
    ScrollView,
    Linking,
    Dimensions,
    Platform,
    AlertIOS,
    TabBarIOS,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as alerts from '../../services/unsetpricealert';
import * as action from '../../services/geniesuscribe';

import * as _ from 'lodash';

const { height, width } = Dimensions.get('window');

export default class GenieSuscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
      user: '',
      loading: true,
      isload: false,
      loadId: '',
    };
    this._previouspage = this._previouspage.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentWillMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
    action.suscribelist(this.props.navigation.state.params.email).then((val) => {
      this.setState({ dataPoints: val.data, loading: false });
    });
  }
  _previouspage() {
    this.props.navigation.goBack();
  }
  pressButton(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(`Don't know how to open URI: ${url}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else if (Platform.OS === 'ios') {
        AlertIOS.prompt(`Don't know how to open URI: ${url}`);
      }
    });
  }
  loadScrapProductPage(id) {
    this.props.navigation.navigate('scrapproductpage', { id });
  }
  updateState(value) {
    action.suscribelist(this.props.navigation.state.params.email).then((val) => {
      if (this.setState({ dataPoints: val.data, loading: false })) {
        ToastAndroid.show(value, ToastAndroid.SHORT);
      }
    });
  }
  unsetAlert(data) {
    this.setState({
      loading: true,
      loadId: data._id.$id,
    });
    getLocalStorageData('user').then((email) => {
      const checkUser = JSON.parse(email);
      if (checkUser !== null) {
        if (checkUser[0].islogin == true) {
          if (checkUser[0].logintype === 'google') {
            alerts.unsetalert(data._id.$id, checkUser[0].data.email).then((value) => {
              if (!checkUser[0].data.email) {
                this.setState({ isLoad: false });
                if (Platform.OS === 'android') {
                  ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                } else if (Platform.Os === 'ios') {
                  AlertIOS.prompt('Log In Required');
                }
              } else {
                this.updateState(value.message);
              }
            });
          } else {
            alerts.unsetalert(data._id.$id, checkUser[0].profile.email).then((value) => {
              if (!checkUser[0].profile.email) {
                this.setState({ isLoad: false });
                if (Platform.OS === 'android') {
                  ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                } else if (Platform.Os === 'ios') {
                  AlertIOS.prompt('Log In Required');
                }
              } else {
                this.updateState(value.message);
              }
            });
          }
        } else {
          this.setState({ isLoad: false });
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          } else if (Platform.Os === 'ios') {
            AlertIOS.prompt('Log In Required');
          }
        }
      } else {
        this.setState({ isLoad: false });
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } else if (Platform.Os === 'ios') {
          AlertIOS.prompt('Log In Required');
        }
      }
    });
  }
  render() {
    const button = (Platform.OS === 'ios') ? (
      <TabBarIOS>
        <Icon.TabBarItem
          logo={require('../../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white" overflowIconName="md-more" action={[]} elevation={4}
        />
      </TabBarIOS>
    ) : (<Icon.ToolbarAndroid logo={require('../../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} iconSize={35} titleColor="white" overflowIconName="md-more" action={[]} elevation={4} />);

    const { dataPoints } = this.state;
    const suscribe_product = _.map(dataPoints, (data, key) => (
      <View
        key={key} style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: STRING.GreyColor,
        }}
      >
        <View style={{ marginBottom: 5, marginTop: 5 }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            // borderBottomWidth: 1,
            borderBottomColor: STRING.GreyColor,
          }}
          >
            <Text style={{
              // textDecorationLine: 'underline',
              marginLeft: 5,
              fontSize: 13,
              fontWeight: 'bold',
            }}
            >{data.name}</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 12,
          }}
          >
            <View style={{ width: '45%', flexDirection: 'row' }}>
              <Text
                style={{
                    // backgroundColor: 'blue',
                  marginTop: 10,
                  marginLeft: 5,
                  height: '55%',
                  width: '90%',
                  fontSize: 22,
                  fontWeight: 'bold',
                    // color: 'white',
                }}
              >{data.website}</Text>
            </View>
            <View >
              <Image
                style={{
                  marginTop: 5,
                  borderColor: 'red',
                  height: '85%',
                  width: 75,
                }} resizeMode="contain" source={{
                  uri: data.img,
                }}
              />
            </View>
            <View style={{
              flex: 1,
              marginTop: 5,
              flexDirection: 'column',
            }}
            >
              <Text style={{
                alignSelf: 'flex-end',
                fontSize: 18,
                fontWeight: 'bold',
              }}
              >Rs. {data.price}</Text>
              <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                <Button
                  containerStyle={{
                    marginTop: 9,
                    marginLeft: 10,
                    width: 68,
                    padding: 4.5,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: STRING.RedColor,
                  }} style={{
                    fontSize: 11,
                    color: 'white',
                  }} styleDisabled={{
                    color: 'blue',
                  }} onPress={() => {
                    this.pressButton(data.href);
                  }}
                >
                  BUY NOW
                </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 3,
          borderTopWidth: 1,
          borderTopColor: STRING.GreyColor,
        }}
        >
          <View style={{ width: '50%', marginTop: 2, marginBottom: 2, borderRightWidth: 1, borderRightColor: STRING.GreyColor }}>
            <View>
              <TouchableOpacity onPress={() => { this.loadScrapProductPage(data._id.$id); }}>
                <Text style={{ alignSelf: 'center', fontSize: 12, height: 16 }}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '15%', marginTop: 2, marginBottom: 2, justifyContent: 'center', borderRightWidth: 1, borderRightColor: STRING.GreyColor }} />
          <View style={{ flex: 1, marginLeft: 2, marginTop: 2, marginBottom: 2, justifyContent: 'center' }} >
            <View style={{ flex: 1, backgroundColor: '#E08283' }}>
              <TouchableOpacity onPress={() => { this.unsetAlert(data); }} >
                <Text style={{
                  color: 'white',
                  marginLeft: 1,
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                }}
                >Remove Price Alert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      ),
          );
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}
      >
        {button}
        {this.state.loading ?
          <ActivityIndicator
            style={{
              height: height - 90,
            }} animating={this.state.loading} color={STRING.BlueColor} size={32}
          /> :
          <ScrollView >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'white',
                marginLeft: 9,
                alignItems: 'center',
                marginRight: 9,
                marginTop: 9,
              }} elevation={4}
            >


              <View style={{
                flex: 1,
                flexDirection: 'column',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 9,
                marginBottom: 9,
              }}
              >
                {this.state.dataPoints ?
                suscribe_product :
                <View>
                  <Text style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    margin: 10,
                    textAlign: 'center',
                  }}
                  >
                    Sorry!!!!No Product Suscribe
                  </Text>
                </View>
                }
              </View>
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}
