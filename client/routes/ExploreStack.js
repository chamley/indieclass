// Importing packages for navigation stack
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// Importing screens
import Explore from './../screens/Explore';
import ExploreFilter from './../screens/ExploreFilter';
// view class to be added

const exploreScreens = {
  Explore: {
    screen: Explore
  },
  ExploreFilter: {
    screen: ExploreFilter
  }
  // view class to be added
}

const ExploreStack = createStackNavigator(exploreScreens);

export default createAppContainer(ExploreStack);