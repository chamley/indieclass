import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';

import {LottieView} from 'lottie-react-native';

import { useDispatch } from 'react-redux';
import { teacherDeleteClassDB } from '../store/actions'
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

function TeacherViewClass({route, navigation}) {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const dispatch = useDispatch();
  const popAction = StackActions.pop(1);


  const [deletemark, setDeleteMark] = useState(false);

  const { classObj } = route.params;

  function handleDelete() {
    teacherDeleteClassDB(classObj)(dispatch);
    setDeleteMark(true);
    navigation.dispatch(popAction)
  }
  function handleEdit() {
  }

  if (fontsLoaded) {
  return (
    <SafeAreaView>
      <Text style={stylesheet.label}> Class Name </Text>
      <Text style={stylesheet.section}> {classObj.classname} </Text>
      <Text style={stylesheet.label}> Class Description </Text>
      <Text style={stylesheet.section}> {classObj.description} </Text>
      <Text style={stylesheet.label}> Sign ups</Text>
      <Text style={stylesheet.section}> {classObj.signedup} / {classObj.limit} </Text>
      <TouchableOpacity
      onPress={()=> handleEdit()}
      // title="Edit Class"
      // color={pri}
      style={stylesheet.editClass}
      >
        <Text style={stylesheet.buttonText}>Edit Class</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> handleDelete()}
        // title="Delete Class"
        // color="red"
        style={stylesheet.deleteClass}
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
  section:{
    padding:15,
    backgroundColor:'#fff',
    marginBottom: 30,
    fontSize: 18,
    color: text,
    fontFamily: 'AvenirLTStdBook',
  },
  label: {
    padding:15,
    backgroundColor: text,
    color: '#fff',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 14
  },
  editClass: {
    backgroundColor: pri,
    padding: 10,
    margin: 10,
    alignItems: 'center'
  },
  deleteClass: {
    backgroundColor: sec,
    padding: 10,
    margin: 10,
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 20,
    fontFamily: 'AvenirLTStdBook',
  }
})

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