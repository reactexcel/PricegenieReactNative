import React, { Component } from 'react';
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   AsyncStorage,
 } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { LoginPage } from '../user/loginpage';
import { LogoutPage } from '../user/logout';

const styles = {
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
};
class DrawerContent extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
    this.handleState = this.handleState.bind(this);
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
  handleState() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  render() {
    let view = <Text />;
    if (this.state.user !== undefined && this.state.user !== '' && this.state.user !== null) {
      view = this.state.user[0].islogin == true ? (
        <LogoutPage handleState={this.handleState} {...this.props} />
      ) : (
        <LoginPage handleState={this.handleState} {...this.props} />
      );
    } else {
      view = (<LoginPage handleState={this.handleState} {...this.props} />);
    }
    return (
      <ScrollView style={styles.container}>
        {view}
      </ScrollView>
    );
  }
}
export default DrawerContent;
