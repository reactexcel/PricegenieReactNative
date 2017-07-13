import React, { Component } from 'react';
import style from '../../style/basicStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';
import Button from 'react-native-button';
// import * as action from '../services/viewProduct';
import { PieChartBasic } from './graph';
import { ProductList } from './showproduct';
import * as get from '../../services/pricehistroy';
import * as alert from '../../services/scrapproduct';
import * as alerts from '../../services/unsetpricealert';
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
    Platform,
    AlertIOS,
} from 'react-native';
import moment from 'moment';


export class ScrapProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isLoad: false,
      loadId: '',
    };
    this.state = {
      data: [],
      loading: true,
    };
    this._previouspage = this._previouspage.bind(this);
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
        AlertIOS.alert(`Don't know how to open URI: ${url}`);
      }
    });
  }
  componentWillMount() {
    alert.renderScrapProduct(this.props.navigation.state.params.id).then((val) => {
      const history = [];
      history.push(val.price_history.map((dataPoint, idx) => {
        let time = dataPoint.date,
          yDataPoint = dataPoint.price;
        xDataPoint = moment(time, 'YYYY-MM-DD').unix();
        return { xDataPoint, yDataPoint };
      }));
      this.setState({
        data: val,
        history,
        loading: false,
      });
    });
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Icon name={'ios-list'} size={28} style={{ marginRight: 15, color: 'white', alignSelf: 'center' }} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    headerLeft: <View style={{ flexDirection: 'row' }}>
      <Icon name={'ios-arrow-back-outline'} size={30} style={{ color: 'white', marginLeft: 15, paddingRight: 15, alignSelf: 'center' }} onPress={() => { navigation.goBack(); }} />
      <Image source={require('../../img/genie-logo-g.png')} size={20} /></View>,
    headerStyle: style.toolbar,
  });
  render() {
    const { data } = this.state;
    const { height, width } = Dimensions.get('window');
    const { loading } = this.state;
    const product_data =
     (
       <View style={{
         flex: 1,
       }}
       >
         <ScrollView>
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
               color: '#54575a',
             }}
             >
               {data.name}
             </Text>
             <View style={{
               paddingTop: 4,
               paddingBottom: 14,
               flexDirection: 'row',
               alignSelf: 'center',
             }}
             >
               <Image
                 style={{
                   marginTop: 4,
                   height: 150,
                   width: 150,
                   alignSelf: 'center',
                 }} resizeMode="contain" source={{
                   uri: data.img,
                 }}
               />
             </View>
             <View style={{ alignItems: 'center', flex: 1, marginBottom: 5 }}>
               <Text style={{
                 fontSize: 19,
                 fontWeight: 'bold',
               }}
               >Rs. {data.price}</Text>
             </View>
           </View>
           {data.price_history
             ? <View
               elevation={4} style={{
                 flex: 1,
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
                 borderBottomColor: '#e3e0e0',
               }}
               >
                 <Text style={{
                   color: '#54575a',
                   fontSize: 16,
                   fontWeight: 'bold',
                   marginTop: 3.5,
                 }}
                 >
                   PRICE HISTORY
                 </Text>
                 <View style={{
                   marginLeft: 75,
                   flexDirection: 'row',
                 }}
                 >
                   <Icon.Button
                     name="ios-stats" style={{
                       height: 30,
                     }} backgroundColor="white" color={'#e3e0e0'}
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
                 <PieChartBasic data={this.state.history} />
               </View>
             </View>
             : null}
           <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
             <View style={{ flex: 1, marginTop: 8 }}>
               <Button
                 containerStyle={{
                   height: '100%',
                   marginRight: 5,
                   marginLeft: 5,
                   borderRadius: 3,
                   backgroundColor: '#F44336',
                 }} style={{
                   marginTop: 8,
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
         </ScrollView>
       </View>
      );
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#e3e0e0',
        flexDirection: 'column',
      }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading
            ? <ActivityIndicator
              style={{
                height: height - 90,
              }} animating={this.state.loading} color='#01579b' size={32}
            />
            :
            <View>
              {product_data}
            </View>
          }
        </ScrollView>
      </View>

    );
  }
}
