import React, { Component } from 'react';
import style from '../../style/basicStyle';
import {
    View,
    ToastAndroid,
    ActivityIndicator,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    ToolbarAndroid,
    ScrollView,
    Linking,
    Dimensions,
    Platform,
    AlertIOS,
} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as alert from '../../services/pricealert';
import * as alerts from '../../services/unsetpricealert';
import * as action from '../../services/viewProduct';
;

import * as _ from 'lodash';

const { height, width } = Dimensions.get('window');

export class VariantPoduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
      id: '',
      product_id: '',
      user: [],
      loading: true,
    };
    this._previouspage = this._previouspage.bind(this);
    this.checkAlert = this.checkAlert.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentWillMount() {
    this.setState({
      dataPoints: this.props.navigation.state.params.data,
      id: this.props.navigation.state.params.id,
      product_id: this.props.navigation.state.params.productId,
    });
    action.renderProduct(this.props.navigation.state.params.id).then((val) => {
      _.map(val.result, (data) => {
        if (data._id.$id === this.props.navigation.state.params.productId) {
          this.setState({ dataPoints: data.varient_data.data, loading: false });
        }
      });
    });
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }

  loadScrapProductPage(id) {
    this.props.navigation.navigate('scrapproductpage', { id });
  }
  updateState(value) {
    action.renderProduct(this.props.navigation.state.params.id).then((val) => {
      _.map(val.result, (data) => {
        if (data._id.$id === this.props.navigation.state.params.productId) {
          this.setState({ dataPoints: data.varient_data.data, isLoad: false });
        }
      });
      if (Platform.OS === 'android') {
        ToastAndroid.show(value, ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        AlertIOS.alert(value);
      }
    });
  }
  _previouspage() {
    this.props.navigation.goBack();
  }
  setAlert(data) {
    this.setState({
      isLoad: true,
      loadId: data._id.$id,
    });
    getLocalStorageData('user').then((email) => {
      const checkUser = JSON.parse(email);
      if (checkUser !== null && checkUser[0].islogin == true) {
          if (checkUser[0].logintype === 'google') {
            alert.pricealert(data._id.$id, checkUser[0].data.email).then((value) => {
              if (!checkUser[0].data.email) {
                this.setState({ isLoad: false });
                if (Platform.OS === 'android') {
                  ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                } else if (Platform.OS === 'ios') {
                  AlertIOS.alert('Log In Required');
                }
              } else {
                this.updateState(value.message);
              }
            });
          } else {
            alert.pricealert(data._id.$id, checkUser[0].profile.email).then((value) => {
              if (!checkUser[0].profile.email) {
                this.setState({ isLoad: false });
                if (Platform.OS === 'android') {
                  ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                } else if (Platform.OS === 'ios') {
                  AlertIOS.alert('Log In Required');
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
        } else if (Platform.OS === 'ios') {
          AlertIOS.alert('Log In Required');
        }
      }
    });
  }
  unsetAlert(data) {
    this.setState({
      isLoad: true,
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
                } else if (Platform.OS === 'ios') {
                  AlertIOS.alert('Log In Required');
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
                } else if (Platform.OS === 'ios') {
                  AlertIOS.alert('Log In Required');
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
          } else if (Platform.OS === 'ios') {
            AlertIOS.alert('Log In Required');
          }
        }
      } else {
        this.setState({ isLoad: false });
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity('Log In Required', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } else if (Platform.OS === 'ios') {
          AlertIOS.alert('Log In Required');
        }
      }
    });
  }
  checkAlert(alertdata, user) {
    let isMatch = false;
    let isUnmatch = false;
    _.map(alertdata.genie_alerts, (alertData, alertKey) => {
      if (user[0].logintype === 'google') {
        const check = alertData.email_id === user[0].data.email;
        check === true ? isMatch = true : isUnmatch = true;
      } else {
        const check = alertData.email_id === user[0].profile.email;
        check === true ? isMatch = true : isUnmatch = true;
      }
    });
    return (isMatch === true ?
      <View style={{ flex: 1, backgroundColor: '#E08283' }}>
        {this.state.isLoad === true ?
          (this.state.loadId === alertdata._id.$id ?
            <ActivityIndicator
              animating={this.state.isLoad} color={'white'} size="small"
            />
          : <TouchableOpacity onPress={() => { this.unsetAlert(alertdata); }}>
            <Text style={{
              color: 'white',
              marginLeft: 1,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 'bold',
            }}
            >Remove Price Alert</Text>
          </TouchableOpacity>)
        :
          <TouchableOpacity onPress={() => { this.unsetAlert(alertdata); }}>
            <Text style={{
              color: 'white',
              marginLeft: 1,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 'bold',
            }}
            >Remove Price Alert</Text>
          </TouchableOpacity>
        }
      </View>
   :
      <View style={{ flex: 1, backgroundColor: '#4DAF7C' }}>
        {this.state.isLoad === true ?
          (this.state.loadId === alertdata._id.$id ?
            <ActivityIndicator
              animating={this.state.isLoad} color={'white'} size="small"
            />
          : <TouchableOpacity onPress={() => { this.setAlert(alertdata); }}>
            <Text style={{
              color: 'white',
              marginLeft: 1,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 'bold',
            }}
            >Set Price Alert</Text>
          </TouchableOpacity>)
        :
          <TouchableOpacity onPress={() => { this.setAlert(alertdata); }}>
            <Text style={{
              color: 'white',
              marginLeft: 1,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 'bold',
            }}
            >Set Price Alert</Text>
          </TouchableOpacity>
        }
      </View>)
      ;
  }
  pressButton(url) {
    Linking.canOpenURL(url);
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Icon name={'ios-list'} size={28} style={{ marginRight: 15, color: 'white', alignSelf: 'center' }} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    headerLeft: <View style={{ flexDirection: 'row' }}>
      <Icon name={'ios-arrow-back-outline'} size={30} style={{ color: 'white', marginLeft: 15, paddingRight: 15, alignSelf: 'center' }} onPress={() => { navigation.goBack(); }} />
      <Image source={require('../../img/genie-logo-g.png')} size={20} /></View>,
    headerStyle: style.toolbar,
  });
  render() {
    const { dataPoints } = this.state;
    const variant_product = _.map(dataPoints, (data, key) => (
      <View
        key={key} style={{
          borderBottomWidth: 1,
          borderBottomColor: '#e3e0e0',
        }}
      >
        <View style={{ marginBottom: 5, marginTop: 5 }}>
          {/* <View style={{
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth:1,
              borderBottomColor:'#e3e0e0',
            }}
            >
            <Text style={{
              marginLeft:5,
              fontSize: 13,
              fontWeight:'bold'
            }}
            >{data.name}</Text>
          </View> */}
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 12,
          }}
          >
            <View style={{ width: '45%', flexDirection: 'row' }}>
              <Image
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  height: '75%',
                  width: '90%',
                }} resizeMode="contain" source={{
                  uri: data.logo,
                }}
              />
            </View>
            <View >
              <Image
                style={{
                  marginTop: 5,
                  borderColor: 'red',
                  height: '85%',
                  width: 75,
                }} resizeMode="contain" source={{
                  uri: data.image,
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
                    marginLeft: 25,
                    width: 68,
                    padding: 4.5,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: '#F44336',
                  }} style={{
                    fontSize: 11,
                    color: 'white',
                  }} styleDisabled={{
                    color: 'blue',
                  }} onPress={() => {
                    this.pressButton(data.url);
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
          borderTopColor: '#e3e0e0',
        }}
        >
          <View style={{ width: '50%', marginTop: 2, marginBottom: 2, borderRightWidth: 1, borderRightColor: '#e3e0e0' }}>
            <View>
              <TouchableOpacity onPress={() => { this.loadScrapProductPage(data._id.$id); }}>
                <Text style={{ alignSelf: 'center', fontSize: 12, height: 16 }}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '15%', marginTop: 2, marginBottom: 2, justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#e3e0e0' }} />
          <View style={{ flex: 1, marginLeft: 2, marginTop: 2, marginBottom: 2, justifyContent: 'center' }} >
            {this.state.user !== null && this.state.user[0] !== undefined ? (
              this.state.user[0].islogin ?
                this.checkAlert(data, this.state.user)
              :
                <View style={{ flex: 1, backgroundColor: '#4DAF7C' }}>
                  {this.state.isLoad === true ?
                  (this.state.loadId === data._id.$id ?
                    <ActivityIndicator
                      animating={this.state.isLoad} color={'white'} size="small"
                    />
                  : <TouchableOpacity onPress={() => { this.setAlert(data); }}>
                    <Text style={{
                      color: 'white',
                      marginLeft: 1,
                      textAlign: 'center',
                      fontSize: 11,
                      fontWeight: 'bold',
                    }}
                    >Set Price Alert</Text>
                  </TouchableOpacity>)
                :
                  <TouchableOpacity onPress={() => { this.setAlert(data); }}>
                    <Text style={{
                      color: 'white',
                      marginLeft: 1,
                      textAlign: 'center',
                      fontSize: 11,
                      fontWeight: 'bold',
                    }}
                    >Set Price Alert</Text>
                  </TouchableOpacity>
                }

                </View>
            )
            :
                <View style={{ flex: 1, backgroundColor: '#4DAF7C' }}>
                  {this.state.isLoad === true ?
                (this.state.loadId === data._id.$id ?
                  <ActivityIndicator
                    animating={this.state.isLoad} color={'white'} size="small"
                  />
                : <TouchableOpacity onPress={() => { this.setAlert(data); }}>
                  <Text style={{
                    color: 'white',
                    marginLeft: 1,
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}
                  >Set Price Alert</Text>
                </TouchableOpacity>)
              :
                <TouchableOpacity onPress={() => { this.setAlert(data); }}>
                  <Text style={{
                    color: 'white',
                    marginLeft: 1,
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}
                  >Set Price Alert</Text>
                </TouchableOpacity>
              }

                </View>
            }
          </View>
        </View>
      </View>
        ));
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            marginLeft: 9,
            marginRight: 9,
            marginTop: 9,
          }} elevation={4}
        >
          <ScrollView >
            {this.state.loading ?
              <ActivityIndicator
                style={{
                  height: height - 90,
                }} animating={this.state.loading} color='#01579b' size="large"
              />
            :
              <View style={{
                flexDirection: 'column',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 9,
                marginBottom: 9,
              }}
              >
                {variant_product}
              </View>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
