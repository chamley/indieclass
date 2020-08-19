/* 
Comments:
*/


import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function ProfileMenu({navigation}) {

  const spacing = 30;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={stylesheet.item}> can put username here </Text>
      <Text style={stylesheet.item}> ... can put other stuff here ... </Text>
      <TouchableOpacity onPress={()=>navigation.push('CreateClass')}>
        <Text style={stylesheet.item}>(clickable) Host a Class</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.push('HostedClasses')}>
        <Text style={stylesheet.item}>(clickable) View your hosted classes</Text>
      </TouchableOpacity>
      <Text style={stylesheet.item}> Payments </Text>
      <Text style={stylesheet.item}> can add logout button here (stretch) </Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  item: {
    padding:40,
    backgroundColor:'#E2F0F9'

  }
});

export default ProfileMenu;