import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
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
    // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
    // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
    // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
    AvenirLTStdBlack: require('./../assets/fonts/AvenirLTStdBlack.otf'),
    AvenirLTStdBook: require('./../assets/fonts/AvenirLTStdBook.otf'),
    AvenirLTStdRoman: require('./../assets/fonts/AvenirLTStdRoman.otf'),
  });

export default function CategoryItem({ item, handleCategorySelect }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <ImageBackground
        source={item.img}
        style={styles.image}
      >
        <TouchableOpacity
          style={styles.category}
          onPress={() => handleCategorySelect(item.category_id)}
        >
          <Text style={styles.categoryName}>{item.category_name}</Text>
        </TouchableOpacity>
      </ImageBackground>
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
    flex: 1,
    width: screenWidth,
    height: 152,
    marginVertical: 0,
  },
  category: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    // borderRadius: 10,
    backgroundColor: textTL,
  },
  categoryName: {
    // color: priTL,
    color: 'white',
    fontSize: 45,
    letterSpacing: 10,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontFamily: 'AvenirLTStdRoman',
  },
});
