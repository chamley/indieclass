/* 
Comments:
*/


import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function Explore() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text >Discover</Text>
      <Text style={stylesheet.category}>Health</Text>
      <Text style={stylesheet.category}>Learn</Text>
      <Text style={stylesheet.category}>Music</Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  category:{
    padding:60,
    backgroundColor:'#E2F0F9',
  }
})

export default Explore;