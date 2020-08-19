import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { addMyClass } from './../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function Explore() {

  const dispatch = useDispatch();

  const handlePress = function () {
    dispatch(addMyClass(
      {
        classname: 'Yoga',
        classtime: '2020-09-21T16:00:00.000Z',
        classlength: '90',
        place_id: 'abs_123',
        signedup: '10',
        limit: '20',
        cost: '5',
        description: 'Yoga class to start your day with good energy',
        category_id: 1,
        teacher_id: 1,
      }
    ))
  }

  const myClasses = useSelector(state => state.myClasses)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={'add my class test'} onPress={handlePress}/>
      <Text >Discover</Text>
      {console.log(myClasses)}
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