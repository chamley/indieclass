import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function ProfileMenu({ navigation }) {
  const spacing = 30;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.push('CreateClass')}>
        <Text style={stylesheet.item}>(clickable) Host a Class</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('HostedClasses')}>
        <Text style={stylesheet.item}>
          (clickable) View your hosted classes
        </Text>
      </TouchableOpacity>
      <Text style={stylesheet.item}> Payments </Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  item: {
    padding: 40,
    backgroundColor: '#E2F0F9',
  },
});

export default ProfileMenu;
