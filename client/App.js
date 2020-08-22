/* 
Comments:
*/

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';

import { store } from './store/store';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { addMyClassDB, getMyClassesDB, getExploreClassesDB } from './store/actions';
import ExploreStackScreen from './routes/ExploreStack';
import MyClasses from './screens/MyClasses'
import Profile from './screens/Profile'

import AuthSignin from './screens/Signin';

export default function App() {
  //console.warn('start of render')

  return (
    <Provider store={store}>
      <ConnectedWrapper />
    </Provider>
  );
}

const Tab = createBottomTabNavigator();
const backgroundImage = { uri: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/p-419-jackanstey-rp-july2019-0124-a.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=80&usm=15&vib=3&w=1300&s=d050c309c3925e67426b5f8cf876e217" } 

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
        component = {Profile}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
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
