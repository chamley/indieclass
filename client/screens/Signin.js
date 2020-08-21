import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
// import { ANDROID_CLIENT_ID } from '@env';
import apiServiceJWT from '../ApiService/authService';

const ANDROID_CLIENT_ID = '386474715762-ri2tts2sdo995pq1edj1dbeksdldj57b.apps.googleusercontent.com'

function AuthSignin() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const logout = async () => {
    setSignedIn(false);
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
          setSignedIn(true);
          setFirstName(userInfo.firstname);
          setLastName(userInfo.lastname);
          setEmail(userInfo.email);
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

export default AuthSignin;
