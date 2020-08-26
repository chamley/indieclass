import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { Button } from 'react-native';


import { useDispatch } from 'react-redux';
import { teacherDeleteClassDB } from '../store/actions'
import { StackActions } from '@react-navigation/native';


function TeacherViewClass({route, navigation}) {
  const dispatch = useDispatch();
  const popAction = StackActions.pop(1);

  const { classObj } = route.params;

  function handleDelete() {
    teacherDeleteClassDB(classObj)(dispatch)
    navigation.dispatch(popAction)
  }
  function handleEdit() {
  }

  return (
    <SafeAreaView>
      <Text> Class Name </Text>
      <Text style={stylesheet.section}> {classObj.classname} </Text>
      <Text> Class Description </Text>
      <Text style={stylesheet.section}> {classObj.description} </Text>
      <Text> Sign ups</Text>
      <Text style={stylesheet.section}> {classObj.signedup} / {classObj.limit} </Text>
      <Button
      onPress={()=> handleEdit()}
      title="Edit Class"
      color="orange"
      />
      <Button
        onPress={()=> handleDelete()}
        title="Delete Class"
        color="red"
      />
    </SafeAreaView>
  )
}
const stylesheet = StyleSheet.create({
  section:{
    padding:15,
    backgroundColor:'#add8e6',
  }
})


export default TeacherViewClass;