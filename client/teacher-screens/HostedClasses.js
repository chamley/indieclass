/* 
Comments:
*/

import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

// For current user ID fetch and sort by whether event date is before or after current date 

function HostedClasses() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={stylesheet.category}> Upcoming Classes</Text>
      <Text> ... </Text>
      <Text style={stylesheet.category}> Past Classes</Text>
      <Text> ... </Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  category:{
    padding:10,
    backgroundColor:'#E2F0F9',
  }
})

export default HostedClasses;