import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/Ionicons';

export class ProductList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      data: [],
    };
  }
  componentWillMount(props) {
    this.setState({
      dataSource: this.state.ds.cloneWithRows(this.props.data),
    });
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource} initialListSize={5} enableEmptySections renderRow={(data, key) => (<View
          key={key} style={{
            marginTop: 5,
            marginLeft: 5,
            marginRight: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderTopWidth: 1,
            borderTopColor: '#e3e0e0',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.selectedProduct(data)} style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Image
              style={{
                flex: 0.3,
                height: 45,
                width: 45,
              }} resizeMode="contain" source={{
                uri: data.image,
              }}
            />
            <View style={{
              flex: 1,
            }}
            >
              <Text style={{
                color: '#54575a',
                fontSize: 13,
              }}
              >
                {data.full_name}
              </Text>
              <Text style={{
                color: '#e3ae22',
                fontSize: 12.5,
              }}
              >
                From Rs: {data.price}
              </Text>
              <Text style={{
                fontSize: 12,
              }}
              >
                {`${data.sellers} Sellers`}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginTop: 50,
            }}
            >
            <Icon size={20} name="ios-heart-outline" backgroundColor={'#3b5998'} />
          </TouchableOpacity> */}
        </View>)}
      />
    );
  }
}
