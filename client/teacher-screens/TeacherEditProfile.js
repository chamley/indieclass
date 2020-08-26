import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Dimensions } from 'react-native';

import { TextInput, Button } from 'react-native';

import { StackActions } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { teacherEditProfileDB } from '../store/actions'
import LottieView from 'lottie-react-native';


function TeacherEditProfile({navigation}) {

  const dispatch = useDispatch();
  const data = useSelector(state=>state);

  const { user } = data;

  const [textDescription, setTextDescription] = useState(user.description);
  const [checkmark, setCheckmark] = useState(false);

  const popAction = StackActions.pop(1);


  function handleSubmit() {
    teacherEditProfileDB(user.token, textDescription)(dispatch);
    setCheckmark(!checkmark);
  }

  return (
    <SafeAreaView>
      {checkmark
      ? <View style={stylesheet.checkmark}>
          <LottieView
            source={require('../assets/376-check-mark.json')}
            onAnimationFinish={()=> navigation.dispatch(popAction)}// implement this instead of setimeout
            style={{height:250,width:250, }}
            autoPlay //loop
            loop={false}
            speed={2}
        />
        <Text> Profile Saved!</Text>
        </View>
      : <View>
      <Text style={stylesheet.title}> {user.firstname} {user.lastname}</Text>
      <TextInput
        defaultValue={textDescription}
        style={stylesheet.textbox}
        onChangeText={text => setTextDescription(text)}
        value={textDescription}
        placeholder={'Tell your students about yourself!'}
        multiline={true}
        textAlign={'left'}
        textAlignVertical={'top'}
         
      />
      <View style={stylesheet.button}>
        <Button
          onPress={handleSubmit}
          title="Done"
          color="blue"
        />
      </View>
      </View>}
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  checkmark: {
    paddingTop:40,
    display:'flex',
    alignItems: 'center',
    justifyContent:'center'

  },
  title:{
    paddingTop:30,
    padding:20,
  },
  button: {
    paddingTop:300
  },
  textbox:{
    padding:10,
    height: 240,
    width:Dimensions.get('window').width,
    borderColor: 'blue',
    borderWidth: 2,
    backgroundColor:'white'
  }
});

export default TeacherEditProfile;