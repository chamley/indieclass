/* 
Comments: Next steps create a card component that is touchable and 
*/

import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

import { useSelector } from 'react-redux';




// sort if class.time>Date.now() class is upcoming else its past classes





function HostedClasses() {
  const data =  useSelector(state => state)
  const { teacherClasses } = data;
  const pastClasses = [];
  const upcomingClasses = [];
  const now = Date.now();

  for (let i=0; i<teacherClasses.length; i++) {
    let item = teacherClasses[i];
    if(item.classtime>now) {
      upcomingClasses.push(item)
    } else {
      pastClasses.push(item)
    }
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={stylesheet.category}> Upcoming Classes</Text>
      <FlatList
      data = {upcomingClasses}
      keyExtractor={item=>item.classname}
      renderItem={ ({item}) => (
          <Text>{item.classname}</Text>
        )
      }
      />
      <Text style={stylesheet.category}> Past Classes (not done)</Text>
      <FlatList
      data = {pastClasses}
      keyExtractor={item=>item.classname}
      renderItem={ ({item}) => (
          <Text>{item.classname}</Text>
        )
      }
      />
      <Button
      onPress={()=>console.warn(teacherClasses)}
      title="debug classes"
      color="yellow"
      accessibilityLabel="Learn more about this purple button"
    />
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