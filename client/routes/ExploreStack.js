import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Importing screens
import Explore from './../screens/Explore';
import ExploreFilter from './../screens/ExploreFilter';
import ViewClass from './../screens/ViewClass';
import { useSelector } from 'react-redux';
import { getExploreClassesDB, getCategoriesDB } from './../store/actions';

const ExploreStack = createStackNavigator();

function ExploreStackScreen () {

  const cat = useSelector(store=>store.category_id);
  const cats = useSelector(store=>store.categories)

  // const filtered = cats.filter(item=>item.category_id == cat)
  // console.log(filtered[0].category_name)
  // let title = filtered[0].category_name

  let title = 'Explore'

  return (
    <ExploreStack.Navigator screenOptions={{
      headerStyle: headerStyle
    }}>
      <ExploreStack.Screen name="Explore" component={Explore} options={{title: "Explore"}}/>
      <ExploreStack.Screen name="ExploreFilter" component={ExploreFilter} options={{title: title}}/>
      <ExploreStack.Screen name="ViewClass" component={ViewClass} options={{title: "Class Details"}}/>
    </ExploreStack.Navigator>
  );
}
const headerStyle = {
  backgroundColor: 'rgba(255,155,74,0.7)',
}

export default ExploreStackScreen;