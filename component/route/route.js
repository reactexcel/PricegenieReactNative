import { StackNavigator } from 'react-navigation';
import { Home } from '../view/home';
import { Subcategory } from '../view/subcategory';
import { ProductPage } from '../view/ProductPage';
import { Filter } from '../view/filter';
import { ProductView } from '../view/productView';
import { VariantPoduct } from '../view/variant';
import { GenieSuscribe } from '../view/geniesuscribe';
import { ScrapProductView } from '../view/scrapproductpage';


const Root = StackNavigator({
  home: {
    screen: Home,
  },
  subcategory: {
    screen: Subcategory,
  },
  productPage: {
    screen: ProductPage,
  },
  filter: {
    screen: Filter,
  },
  productView: {
    screen: ProductView,
  },
  variant: {
    screen: VariantPoduct,
  },
  scrapproductpage: {
    screen: ScrapProductView,
  },
});

export default Root;
