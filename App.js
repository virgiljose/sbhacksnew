import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  withNavigation
} from 'react-navigation';

import Login from "./Screens/Login";
import OrderPostedList from "./Screens/OrderPostedList";
import OrderPosted from "./Screens/OrderPosted";
import DeliveryStatus from "./Screens/DeliveryStatus";
import RestaurantList from "./Screens/RestaurantList";
import RestaurantMenu from "./Screens/RestaurantMenu";
import Checkout from "./Screens/Checkout";
import Profile from "./Screens/Profile";

const RestaurantStack = createStackNavigator(
  {
    RestaurantList: {screen: RestaurantList},
    RestaurantMenu: {screen: RestaurantMenu},
    Checkout: {screen: Checkout},
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const OrderStack = createStackNavigator(
  {
    OrderPostedList: {screen: OrderPostedList},
    OrderPosted: {screen: OrderPosted},
    DeliveryStatus: {screen: DeliveryStatus},
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const TabNav = createBottomTabNavigator(
  {
    OrderStack: {screen: OrderStack},
    RestaurantStack: {screen: RestaurantStack},
    Profile: {screen: Profile},
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const MainNavigator = createStackNavigator(
  {
    Login: Login,
    TabNav: TabNav,
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const App = createAppContainer(MainNavigator);

export default App;
