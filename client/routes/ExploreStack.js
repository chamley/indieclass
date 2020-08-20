import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Importing screens
import Explore from './../screens/Explore';
import ExploreFilter from './../screens/ExploreFilter';
// view class to be added

const ExploreStack = createStackNavigator();

function ExploreStackScreen () {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={Explore} />
      <ExploreStack.Screen name="ExploreFilter" component={ExploreFilter} />
    </ExploreStack.Navigator>
  );
}

export default ExploreStackScreen;