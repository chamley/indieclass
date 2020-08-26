import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import {
  createStackNavigator,
  HeaderBackground,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ProfileMenu from './ProfileMenu';
import CreateClass from '../teacher-screens/CreateClass';
import HostedClasses from '../teacher-screens/HostedClasses';
import TeacherViewClass from '../teacher-screens/TeacherViewClass';
import Payments from '../teacher-screens/Payments';

const Stack = createStackNavigator();

function Profile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
      <Stack.Screen name="CreateClass" component={CreateClass} />
      <Stack.Screen name="HostedClasses" component={HostedClasses} />
      <Stack.Screen name="TeacherViewClass" component={TeacherViewClass} />
      <Stack.Screen name="Payments" component={Payments} />
    </Stack.Navigator>
  );
}

export default Profile;
