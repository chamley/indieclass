import React from 'react'
import { StyleSheet, Text, TouchableOpacity, AppLoading } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function CategoryItem({ item, handleCategorySelect }) {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  return (
    <TouchableOpacity
      style={styles.category}
      onPress={()=>handleCategorySelect(item.category_id)}
    >
      <Text
        style={styles.categoryName}
        >{item.category_name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    width: 350,
    padding: 30,
    marginVertical: 15,
    backgroundColor: 'teal',
    borderRadius: 10,
    alignItems: 'center'
  },
  categoryName: {
    color: '#fff',
    fontSize: 30,
    letterSpacing: 10,
    textTransform: 'uppercase',
    fontWeight: '100',
    // fontFamily: 'Inter_900Black' 
  },
  image: {
    flex: 1
  }
})