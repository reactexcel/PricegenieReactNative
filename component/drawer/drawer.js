import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import ControlPanel from './controlpanel';
import Root from '../route/route';

class DrawerView extends Component {
  constructor() {
    super();
    this.state = {
      drawer: false,
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ handleOpen: this.openDrawer });
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <Icon name={'ios-list'} size={25} style={{ marginRight: 15 }} onPress={() => params.handleOpen()} />,
    };
  };
  openDrawer(val = 1) {
    console.log('open');
    if (val === 1) {
      this.setState({ drawer: true });
    }
  }
  closeDrawer(val = 1) {
    if (val === 1) {
      this.setState({ drawer: false });
    }
  }
  render() {
    console.log(this.props, 'drawer');
    return (
      <Drawer
        type="overlay"
        open={this.state.drawer}
        content={
          <ControlPanel
            open={this.openDrawer}
            close={this.closeDrawer}
            navigation={this.props.navigation}
          />
        }
        tapToClose
        side="right"
        styles={{ main: { shadowColor: '#fff', shadowOpacity: 0.3, shadowRadius: 15 } }}
        onClose={() => {
          this.closeDrawer();
        }}
        captureGestures
        tweenDuration={100}
        panCloseMask={0.2}
        panThreshold={0.01}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
        openDrawerOffset={0.3}
        closeDrawerOffser={-3}
      >
        <Root open={this.props.navigation} closeDrawer={this.closeDrawer} />
      </Drawer>
    );
  }
}

export default DrawerView;
