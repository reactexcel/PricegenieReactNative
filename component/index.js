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
    Dimensions,
} from 'react-native';
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
import { LogoutPage } from './logout';
import Splash from './splash';
import DrawerView from './drawer';


const { height, width } = Dimensions.get('window');
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
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleState = this.handleState.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.stateset = this.stateset.bind(this);
  }
  componentDidMount() {
    SplashScreen.hide();
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
    console.log(width, 'di', height);
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
    if (route.name === 'splash') {
      return (<Splash navigator={navigator} {...route.payload} />);
    } else if (route.name === 'home') {
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
    } else if (route.name === 'splash') {
      return Navigator.SceneConfigs.HorizontalSwipeJump;
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
