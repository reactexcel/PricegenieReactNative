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
import { LoginPage } from '../user/loginpage';
import { LogoutPage } from '../user/logout';


export default class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  componentWillReceiveProps() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  render() {
    let view = <Text />;
    if (this.state.user !== undefined && this.state.user !== '' && this.state.user !== null) {
      view = this.state.user[0].islogin == true ? (<LogoutPage close={this.props.close} navigation={this.props.navigation} />) : (<LoginPage close={this.props.close} navigation={this.props.navigation} />);
    } else {
      view = (<LoginPage close={this.props.close} navigation={this.props.navigation} />);
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
