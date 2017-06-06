import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import ControlPanel from './controlpanel';

class DrawerView extends Component {
  constructor() {
    super();
    this.state = {
      drawer: false,
    };
    this.closeDrawer = this.closeDrawer.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.openDrawer === true) {
      this.setState({ drawer: true });
    } else if (props.openDrawer === false) {
      this.setState({ drawer: false });
    }
  }
  closeDrawer() {
    this.props.closeDrawer();
  }
  render() {
    return (
      <Drawer
        type="overlay"
        open={this.state.drawer}
        content={
          <ControlPanel handleState={this.props.handleState} stateset={this.props.stateset} navigator={this.props.navigator} closeDrawer={this.closeDrawer} />
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
        {this.props.child}
      </Drawer>
    );
  }
}

export default DrawerView;
