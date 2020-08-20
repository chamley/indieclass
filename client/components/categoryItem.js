import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function CategoryItem({ item, handleCategorySelect }) {

  return (
    <TouchableOpacity
      style={stylesheet.category}
      onPress={()=>handleCategorySelect(item.category_id)}
    >
      <Text>{item.category_name}</Text>
    </TouchableOpacity>
  )
}

const stylesheet = StyleSheet.create({
  category: {
    padding: 60,
    margin: 10,
    backgroundColor: '#E2F0F9',
  }
})