import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerView from '../drawer/drawer';
import GenieSuscribe from '../view/geniesuscribe';

const DrawerRoot = StackNavigator({
  Drawer: {
    screen: DrawerView,
  },
  suscribelist: {
    screen: GenieSuscribe,
  },
});

export default DrawerRoot;
