import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
// import { ANDROID_CLIENT_ID } from '@env';
import apiServiceJWT from '../ApiService/authService';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
  setUser,
  getMyClassesDB,
  getTeacherClassesDB,
} from './../store/actions';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
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
const ANDROID_CLIENT_ID =
  '508810122477-9n78ol8u5f1goneo1k4kh71qb954vblj.apps.googleusercontent.com';

function AuthSignin({ setUser, getMyClassesDB, getTeacherClassesDB }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        console.log('😍😍😍😍😍Success');
        console.log('1 result', result);
        const userInfo = await apiServiceJWT.profile(result.idToken);
        console.log('2 user info', userInfo);
        if (userInfo) {
          await dispatch(setUser(userInfo));
          await getMyClassesDB(userInfo.token);
          await getTeacherClassesDB(userInfo.token);
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
  if (fontsLoaded) {
    return (
      <View>
        <Image
          style={{ width: 400, height: 500, marginTop: 25 }}
          resizeMode={'cover'} // or cover
          // must be passed from the parent, the number may vary depending upon your screen size
          source={require('../assets/images/signin.jpg')}
        />
        <View style={styles.container}>
          <Text style={styles.text}>IndieClass</Text>
          <Text style={styles.title}>Welcome</Text>
          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: text,
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 25,
    padding: 10,
  },
  button: {
    backgroundColor: '#FD7400',
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
  },
  text: {
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 15,
    color: '#B1B0AF',
  },
  title: {
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 35,
    padding: 5,
    color: 'black',
  },
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

export default connect(mapStateToProps, {
  setUser,
  getMyClassesDB,
  getTeacherClassesDB,
})(AuthSignin);
