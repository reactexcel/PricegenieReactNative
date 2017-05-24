import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class ProductList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            data: []
        }
    }
    componentWillMount(props) {
        this.setState({
            dataSource: this.state.ds.cloneWithRows(this.props.data)
        })
    }
    render() {
      console.log(this.state.dataSource,'testshowpro');
        return (
            <ListView dataSource={this.state.dataSource} initialListSize={5} enableEmptySections={true} renderRow={(data, key) => <View key={key} style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderTopWidth: 1,
                borderTopColor: STRING.GreyColor
            }}>
              <TouchableOpacity onPress={() => this.props.selectedProduct(data)} style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
              }}>
                <Image style={{
                        flex: .3,
                        height: 45,
                        width: 45
                }} resizeMode="contain" source={{
                        uri: data.image
                }}></Image>
                <View style={{
                        flex: 1
                }}>
                  <Text style={{
                            color: STRING.LightBlackColor,
                            fontSize: 13
                  }}>
                    {data.full_name}
                  </Text>
                  <Text style={{
                            color: STRING.YelloColor,
                            fontSize: 12.5
                  }}>
                    From Rs: {data.price}
                  </Text>
                  <Text style={{
                            fontSize: 12
                  }}>
                    {`${data.sellers} Sellers`}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    marginTop: 50
              }}>
                <Icon size={20} name="ios-heart-outline" backgroundColor={STRING.LightColor}/>
              </TouchableOpacity>
            </View>}/>
        )
    }
}
