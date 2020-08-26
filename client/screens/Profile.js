import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ProfileMenu from './ProfileMenu';
import CreateClass from '../teacher-screens/CreateClass';
import HostedClasses from '../teacher-screens/HostedClasses';
import TeacherViewClass from '../teacher-screens/TeacherViewClass';
import Payments from '../teacher-screens/Payments';
import TeacherProfile from '../teacher-screens/TeacherProfile'
import TeacherEditProfile from '../teacher-screens/TeacherEditProfile'

const Stack = createStackNavigator();

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
      <Stack.Screen name="CreateClass" component={CreateClass} />
      <Stack.Screen name="HostedClasses" component={HostedClasses} />
      <Stack.Screen name="TeacherViewClass" component={TeacherViewClass} />
      <Stack.Screen name="TeacherEditProfile" component={TeacherEditProfile} />
      <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
      <Stack.Screen name="Payments" component={Payments} />

    </Stack.Navigator>
  );
}

export default Profile;
