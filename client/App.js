import { StatusBar } from 'expo-status-bar';
import React, { useState, Profiler } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Redux from 'redux';
import { Provider, connect, useSelector } from 'react-redux';
import { store } from './store/store';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {
  addMyClassDB,
  getMyClassesDB,
  getExploreClassesDB,
} from './store/actions';
import ExploreStackScreen from './routes/ExploreStack';
import Explore from './screens/Explore';
import MyClasses from './screens/MyClasses';
import Profile from './screens/Profile';
import AuthSignin from './screens/Signin';
import MapView from './components/mapView';

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedWrapper />
    </Provider>
  );
}

const Tab = createBottomTabNavigator();
const backgroundImage = { uri: './assets/images/background.jpg' };

// This component is simpy a child for Provided wrapper that will run through the connected function
const Wrapper = function (props) {
  // const user = useSelector(state => state.user)

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

const ConnectedWrapper = connect(mapStateToProps, {
  addMyClassDB,
  getMyClassesDB,
  getExploreClassesDB,
})(Wrapper);

function MyTabs() {
  const user = useSelector((state) => state.user);

  const logout = async () => {
    setSignedIn(false);
  };

  let profileOrLoginTab;
  if (user.token) {
    profileOrLoginTab = (
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-profile"
              size={24}
              color="#E85B51"
            />
          ),
        }}
      />
    );
  } else {
    profileOrLoginTab = (
      <Tab.Screen
        name="Sign In"
        component={AuthSignin}
        options={{
          tabBarLabel: 'Sign In',
          tabBarIcon: ({ color, size }) => (
            <Feather name="log-in" size={24} color="#E85B51" />
          ),
        }}
      />
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      tabBarOptions={{
        activeTintColor: '#E85B51',
      }}
    >
      <Tab.Screen
        name="Explore"
        // component={Explore}
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marked-alt" size={24} color="#E85B51" />
          ),
        }}
      />
      <Tab.Screen
        name="My Classes"
        component={MyClasses}
        options={{
          tabBarLabel: 'My Classes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-o" size={24} color="#E85B51" />
          ),
        }}
      />
      {profileOrLoginTab}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user,
  };
}
