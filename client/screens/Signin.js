import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
// import { ANDROID_CLIENT_ID } from '@env';
import apiServiceJWT from '../ApiService/authService';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setUser } from './../store/actions';

// const ANDROID_CLIENT_ID = process.env.ANDROID_CLIENT_ID || '214420477216-kg8bmv8etp0kktv9f8pc5s7i3s9pa2ej.apps.googleusercontent.com'
const ANDROID_CLIENT_ID = '214420477216-kg8bmv8etp0kktv9f8pc5s7i3s9pa2ej.apps.googleusercontent.com'

function AuthSignin({ setUser }) {
  
  const dispatch = useDispatch();
  
  const [isSignedIn, setSignedIn] = useState(false);

  const logout = async () => {
    setSignedIn(false); // Clear Google Auth Token?
  };

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log('😍😍😍😍😍Success');
        const userInfo = await apiServiceJWT.profile(result.idToken);
        if (userInfo) {
          dispatch(setUser(userInfo));
        } else {
          console.log('No user info found 😞');
        }
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => signIn()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150,
  },
});

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(AuthSignin);