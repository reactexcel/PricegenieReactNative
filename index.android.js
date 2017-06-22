/**
 * Sample React Native App
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, BackHandler } from 'react-native';
import Index from './component/index';

export default class PriceGenie extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Index />
      </View>
    );
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

AppRegistry.registerComponent('PriceGenie', () => PriceGenie);
