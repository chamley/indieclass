import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
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
    alignSelf: 'center',
    width: 370,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FD7422',
    marginVertical: 5,
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
    fontSize: 25,
    fontFamily: 'AvenirLTStdBook',
    color: text,
  },
  date: {
    fontSize: 16,
    color: '#AD0404',
    fontFamily: 'AvenirLTStdBook',
  },
  length: {
    fontSize: 13,
    color: '#AD0404',
    fontFamily: 'AvenirLTStdBook',
  },
  address: {
    fontSize: 14,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
});
