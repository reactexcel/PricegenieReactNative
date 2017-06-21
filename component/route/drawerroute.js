import { StackNavigator } from 'react-navigation';
import DrawerView from '../drawer/drawer';
import { GenieSuscribe } from '../geniesuscribe';

const DrawerRoot = StackNavigator({
  Drawer: {
    screen: DrawerView,
  },
  suscribelist: {
    screen: GenieSuscribe,
  },
});

export default DrawerRoot;
