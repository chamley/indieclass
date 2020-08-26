import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Dimensions, TouchableOpacity } from 'react-native';

import { TextInput, Button } from 'react-native';

import { StackActions } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { teacherEditProfileDB } from '../store/actions';
import LottieView from 'lottie-react-native';

function TeacherEditProfile({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const { user } = data;

  const [textDescription, setTextDescription] = useState(user.description);
  const [checkmark, setCheckmark] = useState(false);

  const popAction = StackActions.pop(1);

  function handleSubmit() {
    teacherEditProfileDB(user.token, textDescription)(dispatch);
    setCheckmark(!checkmark);
  }

  return (
    <SafeAreaView style={stylesheet.container}>
      {checkmark ? (
        <View style={stylesheet.checkmark}>
          <LottieView
            source={require('../assets/376-check-mark.json')}
            onAnimationFinish={() => navigation.dispatch(popAction)} // implement this instead of setimeout
            style={{ height: 250, width: 250 }}
            autoPlay //loop
            loop={false}
            speed={2}
          />
          <Text> Profile Saved!</Text>
        </View>
      ) : (
        <View>
          <Text style={stylesheet.title}>
            {' '}
            {user.firstname} {user.lastname}
          </Text>
          {/*  <View style={stylesheet.button}>
            <Button onPress={handleSubmit} title="Done" color="blue" />
          </View> */}
          <TextInput
            defaultValue={textDescription}
            style={stylesheet.textbox}
            onChangeText={(text) => setTextDescription(text)}
            value={textDescription}
            placeholder={'Tell your students about yourself!'}
            multiline={true}
            textAlign={'left'}
            textAlignVertical={'top'}
          />
          <TouchableOpacity
            style={stylesheet.button}
            onPress={() => {
              handleSubmit;
            }}
          >
            <Text style={stylesheet.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDAB8F', paddingTop: 100 },
  checkmark: {
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingBottom: 50,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(206,212,211,0.5)',
    alignSelf: 'center',
    width: 300,
    padding: 20,
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22,
    // fontWeight: 'bold',
  },
  textbox: {
    padding: 10,
    height: 240,
    width: Dimensions.get('window').width - 50,
    borderColor: '#E9967A',
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
  },
});

export default TeacherEditProfile;
