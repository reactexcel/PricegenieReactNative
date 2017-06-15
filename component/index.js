/**
 * Sample React Native App
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import CONFIG from '../config/config';
import CONFI from '../config/config';
import CONFIGURE from '../config/config';
import CONF from '../config/config';
import ADDUSER from '../config/config';
import '../style/string';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    BackHandler,
    Platform,
    AppState,
} from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import { Navigator } from 'react-native-deprecated-custom-components';
import Drawer from 'react-native-drawer';
import { Home } from './home';
import SplashScreen from 'react-native-splash-screen';
import { getLocalStorageData } from '../services/localstorage';
import { setLocalStorageData } from '../services/localstorage';
import { Subcategory } from './subcategory';
import { ProductPage } from './ProductPage';
import { Filter } from './filter';
import { ProductView } from './productView';
import { PieChartBasic } from './graph';
import { VariantPoduct } from './variant';
import { LoginPage } from './loginpage';
import { GenieSuscribe } from './geniesuscribe';
import { LogoutPage } from './logout';
import { ScrapProductView } from './scrapproductpage';
import DrawerView from './drawer';

const onMainScreen = true;
BackHandler.addEventListener('hardwareBackPress', () => {
  if (route.name !== 'home') {
    navigator.pop();
    return true;
  }
  return false;
});

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      drawerOpen: false,
      navigator: '',
      route: '',
      loginState: 0,
      isReceive: false,
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleState = this.handleState.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.stateset = this.stateset.bind(this);
    this.checkState = this.checkState.bind(this);
    this.showLocalNotification = this.showLocalNotification.bind(this);
  }
  componentWillMount() {
    this.notificationListner = FCM.on(FCMEvent.Notification, async (notif) => {
      if (notif.opened_from_tray) {
        return;
      }
      if (Platform.OS === 'ios') {
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData);
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All);
            break;
        }
      }
    });
    AppState.addEventListener('change', this.showLocalNotification);
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  componentWillUnmount() {
    this.notificationListner.remove();
  }
  showLocalNotification(change) {
    if (change == 'active') {
      const data = [];
      console.log('hello');
      FCM.getInitialNotification().then((notif) => {
        data.push(notif);
        console.log(data);
        console.log('INITIAL NOTIFICATION', notif);
        this.setState({
          initNotif: notif,
        });
      });
      FCM.presentLocalNotification({
        vibrate: 500,
        title: 'Hello',
        body: 'Test Notification',
        priority: 'high',
        show_in_foreground: true,
        picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
      });

    // this clear all notification from notification center/tray
      FCM.removeAllDeliveredNotifications();
      // navigator
      if (data !== null && data[0] !== undefined) {
        console.log(data.length);
        console.log(data, 'inside if');
      }
      console.log(this.state.initNotif);
      console.log(data);
      if (this.state.initNotif !== undefined && this.state.initNotif.body) {
        console.log(this.state.initNotif);
        console.log('push');
        navigator.push({
          name: 'subcategory',
          payload: {
            name: 'MobilesTablets',
          },
        });
      }
    }
  }
  checkState() {
    if (this.state.isReceive) {
      console.log('do somthing', this.state.initNotif);
      this.setState({
        isReceive: false,
      });
      navigator.push({
        name: 'subcategory',
        payload: {
          name: 'MobilesTablets',
        },
      });
    } else {
      console.log('do nothing');
    }
  }
  closeDrawer() {
    this.setState({ drawerOpen: false });
  }
  openDrawer() {
    this.setState({ drawerOpen: true });
  }
  handleState(val) {
    if (val === 1) {
      this.setState({ loginState: 1 });
    }
  }
  stateset(val) {
    if (val === 0) {
      this.setState({ loginState: 0 });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#01579b" barStyle="light-content" />
        <Navigator
          initialRoute={{
            name: 'home',
            payload: {},
          }} renderScene={this.renderScene} configureScene={this.configureScene}
        />
      </View>
    );
  }
  renderScene(route, navigator) {
    global.route = route;
    global.navigator = navigator;
    global.state = this;
    if (route.name === 'home') {
      const child = <Home handleState={this.handleState} navigator={navigator} openstate={this.openDrawer} {...route.payload} />;
      return (<DrawerView stateset={this.stateset} handleState={this.state.loginState} navigator={navigator} openDrawer={this.state.drawerOpen} closeDrawer={this.closeDrawer} child={child} {...route.payload} />);
    } else if (route.name === 'subcategory') {
      const child = <Subcategory handleState={this.handleState} navigator={navigator} openstate={this.openDrawer} {...route.payload} />;
      return (<DrawerView stateset={this.stateset} handleState={this.state.loginState} navigator={navigator} openDrawer={this.state.drawerOpen} closeDrawer={this.closeDrawer} child={child} {...route.payload} />);
    } else if (route.name === 'productPage') {
      const child = <ProductPage navigator={navigator} handleState={this.handleState} openstate={this.openDrawer} {...route.payload} />;
      return (<DrawerView stateset={this.stateset} handleState={this.state.loginState} navigator={navigator} openDrawer={this.state.drawerOpen} closeDrawer={this.closeDrawer} child={child} {...route.payload} />);
    } else if (route.name === 'filter') {
      return (<Filter navigator={navigator} {...route.payload} />);
    } else if (route.name === 'productview') {
      const child = <ProductView navigator={navigator} handleState={this.handleState} openstate={this.openDrawer} {...route.payload} />;
      return (<DrawerView stateset={this.stateset} handleState={this.state.loginState} navigator={navigator} openDrawer={this.state.drawerOpen} closeDrawer={this.closeDrawer} child={child} {...route.payload} />);
    } else if (route.name === 'graph') {
      return (<PieChartBasic navigator={navigator} {...route.payload} />);
    } else if (route.name === 'variant') {
      return (<VariantPoduct navigator={navigator} {...route.payload} />);
    } else if (route.name === 'login') {
      return (<LoginPage navigator={navigator} {...route.payload} />);
    } else if (route.name === 'logout') {
      return (<LogoutPage navigator={navigator} {...route.payload} />);
    } else if (route.name === 'suscribelist') {
      return (<GenieSuscribe navigator={navigator} {...route.payload} />);
    } else if (route.name === 'scrapproduct') {
      return (<ScrapProductView navigator={navigator} {...route.payload} />);
    }
  }
  configureScene(route, routeStack) {
    if (route.name === 'home') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'subcategory') {
      return Navigator.SceneConfigs.PushFromRight;
    } else if (route.name === 'productPage') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'filter') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'productview') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'graph') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'variant') {
      return Navigator.SceneConfigs.FloatFromBottom;
    } else if (route.name === 'login') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'logout') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else if (route.name === 'suscribelist') {
      return Navigator.SceneConfigs.FloatFromBottom;
    } else if (route.name === 'scrapproduct') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
