/* 
Comments: Next steps create a card component that is touchable
  --> can see the card, delete it
*/

import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, TouchableOpacity } from 'react-native';
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
    // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
    // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
    // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
    AvenirLTStdBlack: require('./../assets/fonts/AvenirLTStdBlack.otf'),
    AvenirLTStdBook: require('./../assets/fonts/AvenirLTStdBook.otf'),
    AvenirLTStdRoman: require('./../assets/fonts/AvenirLTStdRoman.otf'),
  });

function HostedClasses({navigation}) {
  const { teacherClasses } =  useSelector(state => state)
  const pastClasses = [];
  const upcomingClasses = [];

  for (let i=0; i<teacherClasses.length; i++) {
    let item = teacherClasses[i];
    let now = Date.now()
    let classtime = new Date(item.classtime).getTime();
    if(Number(classtime) > Number(now)) {
      upcomingClasses.push(item)
    } else {
      pastClasses.push(item)
    }
    console.log('classtime', Number(classtime));
    console.log('now', Number(now));
  }
  console.log('upcoming classes', upcomingClasses.map(item=>item.classname));
  console.log('past classes', pastClasses.map(item=>item.classname));

  function Item ({classObj}) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {
      return (
        <View>
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate('TeacherViewClass', {classObj})
            }}
            style={stylesheet.classButtonContainer}
          >
            <View style={stylesheet.dateTimeContainer}>
              <Text style={stylesheet.classDate}>{moment(classObj.classtime).format('h:mm a')}</Text>
              <Text style={stylesheet.classDate}>{moment(classObj.classtime).format('Do MMM')}</Text>
              <Text style={stylesheet.length}>({classObj.classlength} minutes)</Text>
            </View>
            <View style={stylesheet.details}>
              <Text style={stylesheet.classname}>{classObj.classname}</Text>
              <Text style={stylesheet.address}>{classObj.address}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
      );
    }
  };

  function renderItem(classObj) {
    return (
      <Item classObj={classObj.item} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
      <Text style={stylesheet.heading}> Upcoming Classes</Text>
      <FlatList
        data = {upcomingClasses}
        keyExtractor={item=>item.class_id}
        renderItem={renderItem}
      />
      <Text style={stylesheet.heading}> Past Classes </Text>
      <FlatList
        data = {pastClasses}
        keyExtractor={item=>item.class_id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);

const stylesheet = StyleSheet.create({
  classButtonContainer: {
    width: screenWidth,
    flexDirection: 'row',
    borderColor: ter,
    backgroundColor: '#9DE7BE',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginVertical: 1,
  },
  heading:{
    padding:15,
    backgroundColor: text,
    color: '#fff',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 20
  },
  dateTimeContainer: {
    padding: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  classDate: {
    fontSize: 16,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
  length: {
    fontSize: 13,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
  details: {
    padding: 10,
    flex: 3,
  },
  classname:{
    paddingBottom: 5,
    fontSize: 27,
    fontFamily: 'AvenirLTStdBook',
    fontWeight: '500',
    color: text,
  },
  address: {
    fontSize: 12,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  }
})

export default HostedClasses;