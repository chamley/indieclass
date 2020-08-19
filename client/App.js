/* 
Comments:
*/

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

import { store } from './store/store';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Explore from './screens/Explore';
import MyClasses from './screens/MyClasses';
import Profile from './screens/Profile';
import authSignin from './screens/Signin';

export default function App() {
  //console.warn('start of render')

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}

const Tab = createBottomTabNavigator();

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
        component={Explore}
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
        name="Sign in"
        component={authSignin}
        options={{
          tabBarLabel: 'SignIn',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={24} color="green" />
          ),
        }}
      />
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
