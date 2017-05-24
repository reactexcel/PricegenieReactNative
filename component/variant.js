import React, { Component } from 'react';
const style = require('../style/basicStyle');
import '../style/basicStyle';
import {
    View,
    Text,
    Navigator,
    ListView,
    TouchableOpacity,
    Image,
    ToolbarAndroid,
    ScrollView,
    Linking,
} from 'react-native';
const _ = require('lodash');
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
              height: 90,
              width: 90,
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
              marginTop: 12,
              width: 90,
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
        <View style={{
          flex: 1,
          marginBottom: 10,
          flexDirection: 'column',
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
              marginLeft: 28,
              marginRight: 28,
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
