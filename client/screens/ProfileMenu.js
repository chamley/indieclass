import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';



function ProfileMenu({ navigation }) {



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
      <TouchableOpacity onPress={() => navigation.push('Payments')}>
        <Text style={stylesheet.item}>
          (clickable) Payments
        </Text>
    </TouchableOpacity>
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
