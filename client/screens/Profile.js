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
import TeacherEditProfile from '../teacher-screens/TeacherEditProfile';

const Stack = createStackNavigator();

function Profile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileMenu}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="CreateClass"
        component={CreateClass}
        options={{ title: 'Host a class' }}
      />
      <Stack.Screen
        name="HostedClasses"
        component={HostedClasses}
        options={{ title: 'Hosting Classes' }}
      />
      <Stack.Screen
        name="TeacherViewClass"
        component={TeacherViewClass}
        options={{ title: 'View your classes' }}
      />
      <Stack.Screen
        name="TeacherEditProfile"
        component={TeacherEditProfile}
        options={{ title: 'Edit Bio' }}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{ title: 'Payment' }}
      />
    </Stack.Navigator>
  );
}

export default Profile;
