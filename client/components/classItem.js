import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import moment from 'moment'

export default function ClassItem({ item, handleClassSelect }) {

  return (
    <TouchableOpacity
      style={stylesheet.class}
      onPress={()=>handleClassSelect(item.class_id)}
    >
    <Text
      style={stylesheet.heading}
    >{item.classname}
    </Text>
    <Text
      style={stylesheet.date}
    >{moment(item.classtime).format('Do MMMM h:mm a')}
    </Text>
    <Text
      style={stylesheet.length}
    >{item.classlength}
    </Text>
  </TouchableOpacity>
  )
}

const stylesheet = StyleSheet.create({
  class: {
    padding: 10,
    margin: 10,
    backgroundColor: '#E2F0F9',
  },
  heading: {
    fontSize: 25,
    fontWeight: "500"
  },
  date: {
    color: '#7800a1'
  },
  length: {
    color: '#919191'
  }
})