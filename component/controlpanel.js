import React, { Component } from 'react';
import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
// import { getLocalStorageData } from '../services/localstorage';
import { LoginPage } from './loginpage';
import { LogoutPage } from './logout';

const flag = 1;
export default class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
    this.handleStorage = this.handleStorage.bind(this);
    this.handleState = this.handleState.bind(this);
  }
  componentDidMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  handleState(val) {
    if (val === 1) {
      getLocalStorageData('user').then((value) => {
        this.setState({ user: JSON.parse(value) });
      });
      this.props.stateset(0);
    }
  }
  handleStorage(value) {
    if (value == 1) {
      this.setState({ isLoading: true });
      getLocalStorageData('user').then((val) => {
        this.setState({ user: JSON.parse(val) });
      });
    }
    this.setState({ isLoading: false });
  }
  render() {
    const val = this.props.handleState;
    if (val === 1) {
      this.handleState(val);
    }
    const { closeDrawer } = this.props;
    let view = <Text />;
    if (this.state.user !== undefined && this.state.user !== '' && this.state.user !== null) {
      view = this.state.user[0].islogin == true ? (<LogoutPage handleStorage={this.handleStorage} close={closeDrawer} navigator={this.props.navigator} />) : (<LoginPage handleStorage={this.handleStorage} close={closeDrawer} navigator={this.props.navigator} />);
    } else {
      view = (<LoginPage close={closeDrawer} navigator={this.props.navigator} handleStorage={this.handleStorage} />);
    }
    return (
      <ScrollView style={styles.container}>
        {view}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});
