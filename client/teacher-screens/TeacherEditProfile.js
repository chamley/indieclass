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
          <Text style={stylesheet.name}>
            {' '}
            {user.firstname} {user.lastname}
          </Text>
          <Text style={stylesheet.bio}>{user.bio}</Text>
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
          <TouchableOpacity style={stylesheet.button} onPress={handleSubmit}>
            <Text style={stylesheet.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 100 },
  checkmark: {
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#FD7400',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 30,
    marginLeft: 40,
  },
  bio: {
    color: '#B1B0AF',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 18,
    padding: 10,
    marginLeft: 40,
  },
  button: {
    backgroundColor: '#FD7400',
    padding: 15,
    alignSelf: 'center',
    marginTop: 20,
    width: 300,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F5FF00',
  },
  buttonText: {
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
  },
  textbox: {
    padding: 20,
    margin: 20,
    height: 240,
    width: Dimensions.get('window').width - 80,
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 0.5,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});

export default TeacherEditProfile;
