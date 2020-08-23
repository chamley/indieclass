import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';

import { store } from './store/store';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

export default function App(props) {
  //console.warn('start of render')

  // Reference Error: Cant find variable: createStore

  return (
    <Provider store={store}>
      <ConnectedWrapper />
    </Provider>
  );
}

const Tab = createBottomTabNavigator();

// This component is simpy a child for Provided wrapper that will run through the connected function
const Wrapper = function (props) {
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
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Explore"
        // component={Explore}
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="blue" />
          ),
        }}
      />
      <Tab.Screen
        name="My Classes"
        component={MyClasses}
        options={{
          tabBarLabel: 'My Classes',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="table" size={24} color="green" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="red" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sign In"
        component={AuthSignin}
        options={{
          tabBarLabel: 'Sign In',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color="red" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user,
  };
}
