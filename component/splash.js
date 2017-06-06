import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class Splash extends Component {
  constructor() {
    super();
    this.renderHome = this.renderHome.bind(this);
  }
  componentWillMount() {
    setTimeout(this.renderHome, 3000);
  }
  renderHome() {
    this.props.navigator.push({ name: 'home' });
  }
  render() {
    console.log(route);
    return (
      <Image source={require('../img/splash.png')} style={{ flex: 1, alignSelf: 'center' }} />
    );
  }
}
