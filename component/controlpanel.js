import React, { Component } from 'react';
import {
  PropTypes,
ScrollView,
StyleSheet,
Text,
TouchableOpacity,
View } from 'react-native';
import  { LoginPage }  from './loginpage';
import  { LogoutPage }  from './logout';

export default class ControlPanel extends Component {
  constructor(){
    super();
    this.state={
      user:'',
    }
  }
  componentDidMount() {
    getLocalStorageData('user').then((value) => {
      this.setState({ user: JSON.parse(value) });
    });
  }
  render() {
    let {closeDrawer} = this.props;
    let view=<Text></Text>;
    if (this.state.user !== undefined && this.state.user !== '') {
      view = this.state.user[0].islogin == true ? (<LogoutPage close={closeDrawer} navigator={this.props.navigator} />):(<LoginPage close={closeDrawer} navigator={this.props.navigator} />);
    }
    return (
      <ScrollView style={styles.container}>
        {view}
      </ScrollView>
    )
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
  }
})
