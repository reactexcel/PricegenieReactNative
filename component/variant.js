import React, { Component } from 'react';
import '../style/basicStyle';
import {
    View,
    Text,
    // Navigator,
    ListView,
    TouchableOpacity,
    Image,
    ToolbarAndroid,
    ScrollView,
    Linking,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

const _ = require('lodash');
const style = require('../style/basicStyle');

export class VariantPoduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
    };
    this._previouspage = this._previouspage.bind(this);
  }
  componentWillMount() {
    this.setState({ dataPoints: this.props.data });
  }
  _previouspage() {
    this.props.navigator.pop();
  }
  pressButton(url) {
    Linking.canOpenURL(url);
  }
  render() {
    const { dataPoints } = this.state;
    const variant_product = _.map(dataPoints, (data, key) => (
      <View
        key={key} style={{
          borderBottomWidth: 1,
          borderBottomColor: STRING.GreyColor,
        }}
      >
        <View style={{ marginBottom: 5, marginTop: 5 }}>
          {/* <View style={{
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth:1,
              borderBottomColor:STRING.GreyColor,
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
            <View style={{ width: 115, flexDirection: 'row' }}>
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
                    marginLeft: 60,
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
                    this.pressButton(data.url);
                  }}
                >
                  BUY NOW
                </Button>
              </View>
            </View>
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
        <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} onIconClicked={this._previouspage} navIconName="ios-arrow-back" title="" style={style.toolbar} titleColor="white" overflowIconName="md-more" action={[]} elevation={4} />
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
          </ScrollView>
        </View>
      </View>
    );
  }
}
