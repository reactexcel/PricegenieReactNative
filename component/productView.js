import React, { Component } from 'react';
import '../style/basicStyle';
import Icon from 'react-native-vector-icons/Ionicons';
const _ = require('lodash');
import Button from 'react-native-button';
import * as action from '../services/viewProduct';
import { PieChartBasic } from './graph';
import { ProductList } from './showproduct';
import * as get from '../services/pricehistroy';
import * as alert from '../services/pricealert';
import {
    View,
    Text,
    Image,
    ScrollView,
    Linking,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    ListView,
    ToastAndroid,
} from 'react-native';
import * as facebook from '../services/facebook';
import * as actions from '../services/google';

const style = require('../style/basicStyle');

export class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      buttonName: '',
    };
    this.state = {
      product_id: '',
      nodata: false,
      result: [],
      data: [],
      specficiation: [],
      loading: true,
      relatedProduct: [],
      priceData: [],
      similarProduct: [],
      norelatedProduct: false,
      nosimilarProduct: false,
    };
    this._previouspage = this._previouspage.bind(this);
    this.selectedProduct = this.selectedProduct.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.actioncall=this.actioncall.bind(this);
  }
  actioncall() {
    this.props.navigator.push({ name: 'login' });
  }
  componentDidMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  handleAction() {
    if (this.state.user[0].logintype == 'facebook') {
      facebook.facebooksignout().then(() => {
        const data = '';
        const logintype = '';
        const islogin = false;
        const userdata = [{ data, logintype, islogin }];
        setLocalStorageData('user', userdata);
        ToastAndroid.showWithGravity('Sign Out Complete', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        this.props.navigator.push({ name: 'home' });
      }, error => error);
    } else if (this.state.user[0].logintype == 'google') {
      actions.googleSignOut().then(() => {
        const data = '';
        const logintype = '';
        const islogin = false;
        const userdata = [{ data, logintype, islogin }];
        setLocalStorageData('user', JSON.stringify(userdata));
        ToastAndroid.showWithGravity('Sign Out Complete', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        this.props.navigator.push({ name: 'home' });
      }, error => error);
    }
  }
  _previouspage() {
    this.props.navigator.pop();
  }
  callVaiant(data) {
    this.props.navigator.push({
      name: 'variant',
      payload: {
        data,
      },
    });
  }
  selectedProduct(data) {
    this.setState({ nodata: false, loading: true, product_id: data.query_id, norelatedProduct: false, norelatedProduct: false });
    get.pricehistroy(data.query_id).then((dataPoints) => {
      if (dataPoints && dataPoints.length >= 1) {
        this.setState({ data: dataPoints, nodata: true });
      }
    });
    action.relatedProduct(data.query_id).then((val) => {
      if (val.related && val.related.length) {
        this.setState({ relatedProduct: val.related, norelatedProduct: true });
      }
      if (val.similar && val.similar.length) {
        this.setState({ similarProduct: val.similar, nosimilarProduct: true });
      }
    });
    action.renderProduct(data.query_id).then((val) => {
      this.setState({ result: val.result, specficiation: val, loading: false });
    });
  }
  pressButton(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        ToastAndroid.showWithGravity(`Don't know how to open URI: ${url}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }
    });
  }
  setAlert(data) {
    getLocalStorageData('user').then((email) => {
      const checkUser = JSON.parse(email);
      if (checkUser[0].islogin == true) {
        alert.pricealert(data._id.$id, email).then((value) => {
          if (!email) {
            this.props.navigator.push({ name: 'login' });
          } else {
            ToastAndroid.show(value.message, ToastAndroid.SHORT);
          }
        });
      } else {
        ToastAndroid.showWithGravity('Sign In Required', ToastAndroid.SHORT,
        ToastAndroid.BOTTOM);
        this.props.navigator.push({ name: 'login' });
      }
    });
  }
  componentWillMount(props) {
    get.pricehistroy(this.props.id).then((dataPoints) => {
      if (dataPoints && dataPoints.length >= 1) {
        this.setState({ data: dataPoints, nodata: true });
      }
    });
    action.relatedProduct(this.props.id).then((val) => {
      if (val.related && val.related.length) {
        this.setState({ relatedProduct: val.related, norelatedProduct: true });
      }
      if (val.similar && val.similar.length) {
        this.setState({ similarProduct: val.similar, nosimilarProduct: true });
      }
    });
    action.renderProduct(this.props.id).then((val) => {
      this.setState({ product_id: this.props.id, result: val.result, specficiation: val, loading: false });
    });
  }
  render() {
    let button = (
      <Icon.ToolbarAndroid
        logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white" overflowIconName="md-more"
        onActionSelected={() => {
          console.log('hello');
          this.actioncall();
        }}
        actions={[
          {
            title: 'Login',
            iconSize: 25,
          },
          // {
          //   title: 'fav',
          //   iconSize: 25,
          //   iconName: 'md-notifications',
          //   show: 'always',
          // },
        ]}
        elevation={4}
      />);
    if (this.state.user !== undefined && this.state.user !== null) {
      button = this.state.user[0].islogin == true ? (
        <Icon.ToolbarAndroid
          logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white" overflowIconName="md-more"
          onActionSelected={() => {
            this.handleAction();
          }}
          actions={[
            {
              title: 'Log Out',
              iconSize: 25,
            },
            // {
            //   title: 'fav',
            //   iconSize: 25,
            //   iconName: 'md-notifications',
            //   show: 'always',
            // },
          ]}
          elevation={4}
        />) :
      (<Icon.ToolbarAndroid
        logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white" overflowIconName="md-more"
        onActionSelected={() => {
          this.actioncall();
        }}
        actions={[
          {
            title: 'Login',
            iconSize: 25,
          },
          // {
          //   title: 'fav',
          //   iconSize: 25,
          //   iconName: 'md-notifications',
          //   show: 'always',
          // },
        ]}
        elevation={4}
       />)
      ;
    }

    const { nodata } = this.state;
    const { norelatedProduct } = this.state;
    const { nosimilarProduct } = this.state;
    const { selected } = this.state;
    const { height, width } = Dimensions.get('window');
    const { loading } = this.state;
    const result_data = this.state.result;
    const spec_data = this.state.specficiation;
    const spec_detail = _.map(spec_data.spec_detail, (test, key) => {
      if (key < 4) {
        const str = test.name;
        const key_name = str.trim();
        return (
          <View
            style={{
              flexDirection: 'row',
            }} key={key}
          >
            <Icon size={20} name="ios-checkmark" />
            <Text style={{
              marginLeft: 5,
              marginRight: 20,
              fontSize: 12,
            }}
            >{key_name}</Text>
          </View>
        );
      }
    });
    const product_data = _.map(result_data, (data, key) => (
      <View
        key={key} style={{
          marginTop: 5,
          borderTopWidth: 1,
          borderTopColor: STRING.GreyColor,
        }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
        }}
        >
          <Image
            style={{
              marginTop: 13,
              marginLeft: 3,
              borderColor: 'red',
              height: 75,
              width: 75,
            }} resizeMode="contain" source={{
              uri: data.image,
            }}
          />
          <View style={{
            flex: 1,
            marginTop: 10,
            marginLeft: 5,
            flexDirection: 'column',
          }}
          >
            <Text style={{
              fontSize: 14,
            }}
            >{data.name}</Text>
            <Text style={{
              fontSize: 14.5,
              fontWeight: 'bold',
            }}
            >Rs. {data.price}</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
            }}
            >
              <View style={{
                marginTop: 13,
                width: 70,
                height: 45,
              }}
              >
                <Button
                  containerStyle={{
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
          marginBottom: 10,
          flexDirection: 'row',
        }}
        >
          <Image
            style={{
              height: 17,
              width: 44,
            }} resizeMode="contain" source={{
              uri: data.logo,
            }}
          />
          <TouchableOpacity onPress={() => {
            this.callVaiant(data.varient_data.data);
          }}
          >
            {data.varient_data.data
              ? <Text style={{
                marginLeft: 38,
                fontSize: 11,
              }}
                >
                {`${data.varient_data.data.length} Varient`}
              </Text>
              : <Text style={{
                marginLeft: 38,
                fontSize: 11,
              }}
                />}
          </TouchableOpacity>
        </View>
      </View>
            ));
    return (
      <View style={{
        flex: 1,
        backgroundColor: STRING.GreyColor,
        flexDirection: 'column',
      }}
      >
        {button}
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading
            ? <ActivityIndicator
              style={{
                height: height - 90,
              }} animating={this.state.load} color={STRING.BlueColor} size={32}
              />
            : <View style={{
              flex: 1,
            }}
              >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                }} elevation={4}
              >
                <Text style={{
                  paddingTop: 5,
                  paddingLeft: 5,
                  fontWeight: 'bold',
                  color: STRING.LightBlackColor,
                }}
                >
                  {spec_data.name_text}
                </Text>
                <View style={{
                  marginLeft: 17.5,
                  paddingLeft: 11,
                  paddingTop: 4,
                  paddingBottom: 14,
                  flexDirection: 'row',
                }}
                >
                  <Image
                    style={{
                      marginTop: 4,
                      height: 100,
                      width: 100,
                    }} resizeMode="contain" source={{
                      uri: spec_data.spec_image,
                    }}
                  />
                  <View style={{
                    flex: 1,
                    marginLeft: 15,
                    flexDirection: 'column',
                  }}
                  >
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: STRING.LightBlackColor,
                    }}
                    >
                      Key Features
                    </Text>
                    <View style={{
                      flexDirection: 'column',
                    }}
                    >
                      {spec_detail}
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1.3,
                  backgroundColor: 'white',
                  marginLeft: 9,
                  marginRight: 9,
                  marginTop: 9,
                }} elevation={4}
              >
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  marginLeft: 28,
                  marginRight: 28,
                  marginTop: 9,
                  marginBottom: 9,
                }}
                >
                  <View >
                    <Text style={{
                      color: STRING.LightBlackColor,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    >
                      COMPARE PRICES
                    </Text>
                  </View>
                  {product_data}
                </View>
              </View>
              {nodata
                ? <View
                  elevation={4} style={{
                    flex: 1.3,
                    backgroundColor: 'white',
                    marginLeft: 9,
                    marginRight: 9,
                    marginTop: 9,
                  }}
                  >
                  <View style={{
                    marginLeft: 30,
                    paddingTop: 5,
                    paddingBottom: 5,
                    marginRight: 10,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: STRING.GreyColor,
                  }}
                  >
                    <Text style={{
                      color: STRING.LightBlackColor,
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginTop: 3.5,
                    }}
                    >
                      PRICE HISTROY
                    </Text>
                    <View style={{
                      marginLeft: 75,
                      flexDirection: 'row',
                    }}
                    >
                      <Icon.Button
                        name="ios-stats" style={{
                          height: 30,
                        }} backgroundColor="white" color={STRING.GreyColor}
                      />
                    </View>
                  </View>
                  <View style={{
                    flex: 1,
                    marginTop: 10,
                    marginLeft: 6,
                    marginRight: 10,
                  }}
                  >
                    <PieChartBasic data={this.state.data} />
                  </View>
                </View>
              : null}
              {nosimilarProduct
                ? <View style={{
                  flex: 0.1,
                  marginLeft: 9,
                  marginRight: 9,
                }}
                  >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      marginTop: 10,
                      marginBottom: 1,
                      paddingTop: 5,
                      paddingRight: 10,
                      paddingBottom: 10,
                      marginBottom: 10,
                    }} elevation={4}
                  >
                    <Text style={{
                      padding: 5,
                      fontWeight: 'bold',
                    }}
                    >
                      PRODUCT FROM SAME BRAND
                    </Text>
                    <ProductList data={this.state.similarProduct} selectedProduct={this.selectedProduct} />
                  </View>
                </View>
              : null}
              {norelatedProduct
                ? <View style={{
                  flex: 0.1,
                  marginLeft: 9,
                  marginRight: 9,
                }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      marginTop: 10,
                      marginBottom: 1,
                      paddingTop: 5,
                      paddingRight: 10,
                      paddingBottom: 10,
                      marginBottom: 10,
                    }} elevation={4}
                  >
                    <Text style={{
                      padding: 5,
                      fontWeight: 'bold',
                    }}
                    >
                      YOU MAY ALSO LIKE
                    </Text>
                    <ProductList data={this.state.relatedProduct} selectedProduct={this.selectedProduct} />
                  </View>
                </View>
              : null}
            </View>}
        </ScrollView>
      </View>
    );
  }
}
