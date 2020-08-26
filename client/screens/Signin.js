import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
// import { ANDROID_CLIENT_ID } from '@env';
import apiServiceJWT from '../ApiService/authService';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setUser, getMyClassesDB } from './../store/actions';
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

// const ANDROID_CLIENT_ID = process.env.ANDROID_CLIENT_ID || '214420477216-kg8bmv8etp0kktv9f8pc5s7i3s9pa2ej.apps.googleusercontent.com'
const ANDROID_CLIENT_ID = '508810122477-9n78ol8u5f1goneo1k4kh71qb954vblj.apps.googleusercontent.com'

function AuthSignin({ setUser, getMyClassesDB }) {
    
  const [ fontsLoaded, setFontsLoaded ] = useState(false);
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        console.log('😍😍😍😍😍Success');
        console.log('1 result',result)
        const userInfo = await apiServiceJWT.profile(result.idToken);
        console.log('2 user info',userInfo)
        if (userInfo) {
          await dispatch(setUser(userInfo));
          await getMyClassesDB(userInfo.token);
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
  if(fontsLoaded) {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.header}>Sign In With Google</Text> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => signIn()}
        >
          <Text
            style={styles.buttonText} 
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>
        {/* <Button title="Sign in with Google" onPress={() => signIn()} /> */}
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sec,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: text,
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 25,
    padding: 10
  },
  button: {
    backgroundColor: text,
    padding: 30,
    borderRadius: 10,
    borderColor: ter,
    borderWidth: 2
  },
  buttonText: {
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 20,
    color: '#fff'
  }
});

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user,
  };
}

export default connect(mapStateToProps, { setUser, getMyClassesDB })(AuthSignin);
