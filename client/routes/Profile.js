import React from 'react';

import {
  createStackNavigator,

} from '@react-navigation/stack';
import ProfileMenu from '../screens/ProfileMenu';
import CreateClass from '../teacher-screens/CreateClass';
import HostedClasses from '../teacher-screens/HostedClasses';
import TeacherViewClass from '../teacher-screens/TeacherViewClass';
import Payments from '../teacher-screens/Payments';
import TeacherProfile from '../teacher-screens/TeacherProfile'
import TeacherEditProfile from '../teacher-screens/TeacherEditProfile'

const Stack = createStackNavigator();

// This function stores our navigation options in the teacher journey component of the app
function Profile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="ProfileMenu" component={ProfileMenu} options={{ title: "Profile"}}/>
      <Stack.Screen name="CreateClass" component={CreateClass} options={{ title: "Create a new class"}}/>
      <Stack.Screen name="HostedClasses" component={HostedClasses} options={{ title: "Classes you're hosting"}}/>
      <Stack.Screen name="TeacherViewClass" component={TeacherViewClass} options={{ title: "View your class"}}/>
      <Stack.Screen name="TeacherEditProfile" component={TeacherEditProfile} options={{ title: "Edit Profile Bio"}}/>
      <Stack.Screen name="TeacherProfile" component={TeacherProfile} options={{ title: "Your Bio"}}/>
      <Stack.Screen name="Payments" component={Payments} options={{ title: "Your card details"}}/>

    </Stack.Navigator>
  );
}

export default Profile;
