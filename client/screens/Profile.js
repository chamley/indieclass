/* 
Comments:
*/

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileMenu from './ProfileMenu';
import CreateClass from '../teacher-screens/CreateClass';
import HostedClasses from '../teacher-screens/HostedClasses';

const Stack = createStackNavigator();

function Profile({ navigation, firstname, lastname, email, logout }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMenu">
        {() => (
          <ProfileMenu
            firstname={firstname}
            lastname={lastname}
            email={email}
            logout={logout}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateClass" component={CreateClass} />
      <Stack.Screen name="HostedClasses" component={HostedClasses} />
    </Stack.Navigator>
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

export default Profile;
