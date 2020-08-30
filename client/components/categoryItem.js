import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  View,
  Image,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
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

const getFonts = () =>
  Font.loadAsync({
    AvenirLTStdBlack: require('./../assets/fonts/AvenirLTStdBlack.otf'),
    AvenirLTStdBook: require('./../assets/fonts/AvenirLTStdBook.otf'),
    AvenirLTStdRoman: require('./../assets/fonts/AvenirLTStdRoman.otf'),
  });

export default function CategoryItem({ item, handleCategorySelect }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <TouchableOpacity onPress={() => handleCategorySelect(item.category_id)}>
        <ImageBackground
          source={item.img}
          style={styles.image}
          imageStyle={{ borderBottomLeftRadius: 60, borderTopRightRadius: 60 }}
        >
          <Text style={styles.categoryName}>{item.category_name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: 152,
    marginVertical: 0,
  },
  category: {
    flex: 1,
    alignItems: 'center',
  },
  categoryName: {
    color: 'white',
    fontSize: 30,
    textTransform: 'uppercase',
    paddingTop: 30,
    paddingLeft: 180,
    fontWeight: 'bold',
    fontFamily: 'AvenirLTStdBook',
  },
});
