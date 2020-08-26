import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
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

export default function ClassItem({ item, handleClassSelect }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <TouchableOpacity
        style={styles.classCard}
        onPress={() => handleClassSelect(item.class_id)}
      >
        <LinearGradient
          colors={[secTL, '#be03fc']}
          style={styles.background}
          start={{ x: 0.7, y: 1 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment(item.classtime).format('h:mm a')}
          </Text>
          <Text style={styles.date}>
            {moment(item.classtime).format('Do MMM')}
          </Text>
          <Text style={styles.length}>({item.classlength} minutes)</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.heading}>{item.classname}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
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
  classCard: {
    width: screenWidth,
    flexDirection: 'row',
    borderColor: ter,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginVertical: 1,
  },
  background: {
    position: 'absolute',
    color: 'white',
    left: 0,
    right: 0,
    top: 0,
  },
  dateContainer: {
    padding: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  detailContainer: {
    padding: 10,
    flex: 3,
  },
  heading: {
    paddingBottom: 5,
    fontSize: 27,
    fontFamily: 'AvenirLTStdBook',
    fontWeight: '500',
    color: text,
  },
  date: {
    fontSize: 16,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
  length: {
    fontSize: 13,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
  address: {
    fontSize: 12,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
});
