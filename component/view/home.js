/* eslint-disable no-redeclare*/
/* eslint-disable camelcase*/
/* eslint-disable no-undef*/
/* eslint-disable global-require*/
/* eslint-disable import/prefer-default-export*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_sendDataforward"] }]*/
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    StyleSheet,
    ToolbarAndroid,
    Dimensions,
    ListView,
    ScrollView,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Image,
    ToastAndroid,
    AppState,
} from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import style from '../../style/basicStyle';
import json_data from '../../data/category';
import * as action from '../../services/google';
import * as actions from '../../services/facebook';
import firebaseClient from '../../services/samplenotification';

const styles = StyleSheet.create({});


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(json_data),
    };
    this._sendDataforward = this._sendDataforward.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }
  componentDidMount() {
    // firebaseClient.sendNotification();
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }
  _sendDataforward(data) {
    const cat = data.case;
    this.props.navigation.navigate('subcategory', { name: cat });
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Icon name={'ios-list'} size={28} style={{ marginRight: 15, color: 'white' }} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    headerLeft: <Image source={require('../../img/genie-logo-g.png')} style={{ marginLeft: 15 }} />,
    headerStyle: style.toolbar,
  });
  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e3e0e0',
      }}
      >
        <ScrollView>
          <View style={{
            flex: 1,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 10,
          }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 5,
                backgroundColor: 'white',
              }}
              elevation={3}
            >
              {/* <View style={{
                flex: 1,
                marginLeft: 20,
                marginTop: 3,
                flexDirection: 'row',
                justifyContent: 'space-between',
                }}
                >
                <Icon
                  name="md-search"
                  size={25}
                  color="black"
                  style={{
                flex: 0.1,
                marginLeft: 10,
                flexDirection: 'column',
                alignSelf: 'center',
                  }}
                />
                <TextInput
                  autoCapitalize="words"
                  style={{
                flex: 1,
                flexDirection: 'column',
                marginLeft: 8,
                  }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  returnKeyType={'next'}
                  placeholder={'Search product to get Lowest prize'}
                  onChangeText={text => this.setState({ name: text })}
                />
              </View> */}
            </View>
            <View>
              <Text style={{
                marginTop: 5,
                fontSize: 15,
              }}
              >Shop by Category</Text>
            </View>
            <View style={{
              flex: 1,
              marginTop: 8,
              marginBottom: 8,
              flexDirection: 'column',
            }}
            >
              <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data, key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => this._sendDataforward(data)}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      justifyContent: 'space-around',
                      borderBottomWidth: 2,
                      borderBottomColor: '#e3e0e0',
                    }}
                  >
                    <View style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      margin: 20,
                    }}
                    >
                      <Image
                        style={{
                          flex: 0.2,
                          alignSelf: 'center',
                        }}
                        resizeMode="contain"
                        source={data.image}
                      />
                      <Text style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignSelf: 'center',
                        marginTop: 1,
                        marginLeft: 10,
                      }}
                      >{data.name}</Text>
                      <Icon
                        name="ios-arrow-forward-outline"
                        size={25}
                        color={'#e3e0e0'}
                        style={{
                          marginTop: 3,
                          marginRight: 10,
                        }}
                      />
                    </View>
                  </TouchableOpacity>)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}