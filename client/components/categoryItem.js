import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

const getFonts = () => Font.loadAsync({
  'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
  'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
  'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf')
});

export default function CategoryItem({ item, handleCategorySelect }) {

  const [ fontsLoaded, setFontsLoaded ] = useState(false);

  if(fontsLoaded){

  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    )
  }
  return (
    <ImageBackground
      source = { item.img }
      style = { styles.image }
      imageStyle = {{ borderRadius: 10 }}
    >
      <TouchableOpacity
        style = {styles.category}
        onPress = {()=>handleCategorySelect(item.category_id)}
      >
        <Text
          style = {styles.categoryName}
          >{item.category_name}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 350,
    marginVertical: 15,
  },
  category: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255,155,74,0.7)',
  },
  categoryName: {
    color: '#fff',
    fontSize: 45,
    letterSpacing: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontFamily: 'RobotoMonoBold' 
  }
})