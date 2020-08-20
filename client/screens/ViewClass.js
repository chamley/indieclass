import React from 'react'
import { StyleSheet, Text, View, Button} from 'react-native';
import { useSelector, connect } from 'react-redux';
import { addMyClass, addMyClassDB } from './../store/actions';

export default function ViewClass({ state }) {

  const viewClass = useSelector(state => state.viewClass);

  function handleRegister (cls) {
    console.log(`registered to ${cls}`)
  }

  return (
    <View
      style={stylesheet.category}
    >
      <Text>{viewClass.category_name}</Text>
      <Text>{viewClass.description}</Text>
      <Button title="Register" onPress={()=>handleRegister(viewClass.classname)}/>
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