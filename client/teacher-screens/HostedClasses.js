import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import moment from 'moment';
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

function HostedClasses({ navigation }) {
  const { teacherClasses } = useSelector((state) => state);
  const pastClasses = [];
  const upcomingClasses = [];

  for (let i = 0; i < teacherClasses.length; i++) {
    let item = teacherClasses[i];
    let now = Date.now();
    let classtime = new Date(item.classtime).getTime();
    if (Number(classtime) > Number(now)) {
      upcomingClasses.push(item);
    } else {
      pastClasses.push(item);
    }
  }

  function Item({ classObj }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TeacherViewClass', { classObj });
          }}
          style={stylesheet.classCard}
        >
          <View style={stylesheet.dateContainer}>
            <Text style={stylesheet.date}>
              {moment(classObj.classtime).format('h:mm a')}
            </Text>
            <Text style={stylesheet.date}>
              {moment(classObj.classtime).format('Do MMM')}
            </Text>
            <Text style={stylesheet.length}>
              ({classObj.classlength} minutes)
            </Text>
          </View>
          <View style={stylesheet.detailContainer}>
            <Text style={stylesheet.heading}>{classObj.classname}</Text>
            <Text style={stylesheet.address}>{classObj.address}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <AppLoading
          startAsync={getFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      );
    }
  }

  function renderItem(classObj) {
    return <Item classObj={classObj.item} />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}
    >
      <Text style={stylesheet.textContainer}> Upcoming Classes</Text>
      <FlatList
        data={upcomingClasses}
        keyExtractor={(item) => item.class_id}
        renderItem={renderItem}
      />
      <Text style={stylesheet.textContainer}> Past Classes </Text>
      <FlatList
        data={pastClasses}
        keyExtractor={(item) => item.class_id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);

const stylesheet = StyleSheet.create({
  textContainer: {
    marginBottom: 10,
    paddingLeft: 30,
    paddingVertical: 15,
    width: 400,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    borderBottomLeftRadius: 40,
    fontFamily: 'AvenirLTStdBook',
    backgroundColor: '#FEC92E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
  },
  classCard: {
    width: screenWidth,
    flexDirection: 'row',
    alignSelf: 'center',
    width: 370,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DDDBD7',
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

export default HostedClasses;
