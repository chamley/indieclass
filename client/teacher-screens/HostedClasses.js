/* 
Comments: Next steps create a card component that is touchable
  --> can see the card, delete it
*/

import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import ClassItem from './../components/classItem';
import {
  pri,
  priTL,
  sec,
  secTL,
  ter,
  terTL,
  acc,
  accTL,
  text,
  textTL,
} from './../styles/colors';

function HostedClasses({navigation}) {
  const { teacherClasses } =  useSelector(state => state)
  const pastClasses = [];
  const upcomingClasses = [];

  for (let i=0; i<teacherClasses.length; i++) {
    let item = teacherClasses[i];
    if(item.classtime> Date.now()) {
      upcomingClasses.push(item)
    } else {
      pastClasses.push(item)
    }
  }

  function Item ({classObj}) {
    const d = new Date(classObj.classtime)

    return (
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate('TeacherViewClass', {classObj})
        }}
        style={stylesheet.classButtonContainer}
      >
        <Text style={stylesheet.className}>{classObj.classname}</Text>
        <Text style={stylesheet.classDate}>{moment(classObj.classtime).format('h:mm a')}</Text>
        <Text style={stylesheet.classDate}>{moment(classObj.classtime).format('Do MMM')}</Text>
      </TouchableOpacity>
    )
  };

  function renderItem(classObj) {
    return (
      <Item classObj={classObj.item} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
      <Text style={stylesheet.heading}> Upcoming Classes</Text>
      <FlatList
        data = {upcomingClasses}
        keyExtractor={item=>item.class_id}
        renderItem={renderItem}
      />
      <Text style={stylesheet.heading}> Past Classes </Text>
      <FlatList
        data = {pastClasses}
        keyExtractor={item=>item.class_id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);

const stylesheet = StyleSheet.create({
  classButtonContainer: {
    width: screenWidth,
    flexDirection: 'row',
    borderColor: ter,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginVertical: 1,
  },
  heading:{
    padding:15,
    backgroundColor:'#E2F0F9',
  },
  classText:{
    padding:10,
    backgroundColor:'#90ee90',
  }
})

export default HostedClasses;