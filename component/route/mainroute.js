import React from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Root from './route';
import DrawerContent from '../drawer/drawercontent';
import GenieSuscribe from '../view/geniesuscribe';
import { ScrapProductView } from '../view/scrapproductpage';

const Main = DrawerNavigator({
  home: { screen: Root },
  suscribelist: { screen: GenieSuscribe },
  scrapproductpage: { screen: ScrapProductView },
},
  {
    drawerWidth: 250,
    drawerPosition: 'right',
    contentComponent: props => <DrawerContent {...props} />,
  });

export default Main;
