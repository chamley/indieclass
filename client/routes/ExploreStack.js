import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Importing screens
import Explore from './../screens/Explore';
import ExploreFilter from './../screens/ExploreFilter';
import ViewClass from './../screens/ViewClass';

const ExploreStack = createStackNavigator();

function ExploreStackScreen () {
  return (
    <ExploreStack.Navigator screenOptions={{
      headerStyle: headerStyle
    }}>
      <ExploreStack.Screen name="Explore" component={Explore} />
      <ExploreStack.Screen name="ExploreFilter" component={ExploreFilter} />
      <ExploreStack.Screen name="ViewClass" component={ViewClass} />
    </ExploreStack.Navigator>
  );
}
const headerStyle = {
  backgroundColor: 'rgba(255,155,74,0.7)',
}

export default ExploreStackScreen;