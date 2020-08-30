import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native';

import { LottieView } from 'lottie-react-native';

import { useDispatch } from 'react-redux';
import { teacherDeleteClassDB } from '../store/actions';
import { StackActions } from '@react-navigation/native';

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

function TeacherViewClass({ route, navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const dispatch = useDispatch();
  const popAction = StackActions.pop(1);

  const [deletemark, setDeleteMark] = useState(false);

  const { classObj } = route.params;

  function handleDelete() {
    teacherDeleteClassDB(classObj)(dispatch);
    setDeleteMark(true);
    navigation.dispatch(popAction);
  }
  function handleEdit() {}

  if (fontsLoaded) {
    return (
      <SafeAreaView style={{ backgroundColor: 'white', paddingTop: 30 }}>
        <View style={stylesheet.textContainer}>
          <Text style={stylesheet.label}> Class Name </Text>
          <Text style={stylesheet.section}> {classObj.classname} </Text>
        </View>
        <View style={stylesheet.textContainer}>
          <Text style={stylesheet.label}> Class Description </Text>
          <Text style={stylesheet.section}> {classObj.description} </Text>
        </View>
        <View style={stylesheet.textContainer}>
          <Text style={stylesheet.label}> Sign ups</Text>
          <Text style={stylesheet.section}>
            {' '}
            {classObj.signedup} / {classObj.limit}{' '}
          </Text>
        </View>
        {/*  <TouchableOpacity
          onPress={() => handleEdit()}
          // title="Edit Class"
          // color={pri}
          style={stylesheet.button}
        >
          <Text style={stylesheet.buttonText}>Edit Class</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => handleDelete()}
          // title="Delete Class"
          // color="red"
          style={stylesheet.button}
        >
          <Text style={stylesheet.buttonText}>Delete Class</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

const stylesheet = StyleSheet.create({
  section: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 22,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
  textContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 10,
    width: 350,
    borderColor: '#B1B0AF',
    borderWidth: 1,
  },
  label: {
    padding: 15,
    backgroundColor: 'white',
    color: '#B1B0AF',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 16,
  },
  deleteClass: {
    backgroundColor: sec,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
    marginBottom: 120,
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#FD7400',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F5FF00',
  },
  buttonText: {
    fontFamily: 'AvenirLTStdBook',
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
  },
});

export default TeacherViewClass;

// <LottieView
//       source={require('../assets/11744-x-mark-no.json')}
//       onAnimationFinish={()=> navigation.dispatch(popAction)}
//       style={{height:250,width:250, }}
//       autoPlay //loop
//       loop={false}
//       speed={2}
//     >
// :
