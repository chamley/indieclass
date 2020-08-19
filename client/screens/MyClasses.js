/* 
Comments:
*/


import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function MyClasses() {

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={stylesheet.category}>Your Upcoming classes</Text>
      <Text> ... </Text>
      <Text style={stylesheet.category}>Past Classes</Text>
      <Text> ... </Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  category:{
    padding:60,
    backgroundColor:'#E2F0F9',
  }
})

export default MyClasses;