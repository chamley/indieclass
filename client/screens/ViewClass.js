import React, { useState } from 'react'
import { StyleSheet, Text, View, Button} from 'react-native';
import { useSelector, connect } from 'react-redux';
import { addMyClassDB } from './../store/actions';

function ViewClass({ addMyClassDB }) {

  const viewClass = useSelector(state => state.viewClass);
  const user = useSelector(state => state.user);
  const myClasses = useSelector(state => state.myClasses);
  let hasRegistered = myClasses.includes(viewClass);

  function handleRegister (cls) {
    console.log('the class that youve registered for is', cls);
    console.log('current user is', user);
    addMyClassDB(user.token, cls.class_id);
    console.log('myclasses after are ', myClasses);
  }

  return (
    <View
      style={stylesheet.category}
    >
      <Text>{viewClass.classname}</Text>
      <Text>{viewClass.description}</Text>
      <Button title="Register" onPress={()=>handleRegister(viewClass)}/>
      <Text>{hasRegistered ? "has registered" : "has not registered"}</Text>
    </View>
  )
}

const stylesheet = StyleSheet.create({
  category: {
    padding: 60,
    margin: 10,
    backgroundColor: '#E2F0F9',
  }
})

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user
  }
}

export default connect(mapStateToProps, { addMyClassDB })(ViewClass);