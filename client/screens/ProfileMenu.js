/* 
Comments:
*/


import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function ProfileMenu({navigation}) {

  const spacing = 30;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <TouchableOpacity onPress={()=>navigation.push('CreateClass')}>
        <Text style={stylesheet.item}> Host a Class</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.push('HostedClasses')}>
        <Text style={stylesheet.item}>View Your Hosted Classes</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  item: {
    padding:40,
    backgroundColor:'#E2F0F9',
    width:400

  }
});

export default ProfileMenu;