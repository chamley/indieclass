/* 
Comments: Next steps create a card component that is touchable
  --> can see the card, delete it
*/

import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';

// sort if class.time>Date.now() class is upcoming else its past classes

function HostedClasses({navigation}) {
  const { teacherClasses } =  useSelector(state => state)
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
  
  // <TouchableOpacity onPress={()=>navigation.push('HostedClasses')}>
  //   <Text style={stylesheet.item}>(clickable) View your hosted classes</Text>
  // </TouchableOpacity>

  function Item ({classObj}) {
    const d = new Date(classObj.classtime)

    return (
      <View>
        <TouchableOpacity 
            onPress={ () => {
              navigation.navigate('TeacherViewClass', {classObj})
          }}>
          <Text style={stylesheet.classCard}>{classObj.classname} on: {d.getMonth()}/{d.getFullYear()}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  function renderItem(classObj) {
    return (
      <Item classObj={classObj.item} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
      <Text style={stylesheet.category}> Upcoming Classes</Text>
      <FlatList
        data = {upcomingClasses }
        keyExtractor={item=>item.class_id}
        renderItem={renderItem}
      />
      <Text style={stylesheet.category}> Past Classes </Text>
      <FlatList
        data = {pastClasses }
        keyExtractor={item=>item.class_id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  category:{
    padding:15,
    backgroundColor:'#E2F0F9',
  },
  classCard:{
    padding:10,
    backgroundColor:'#90ee90',
  }
})

export default HostedClasses;