import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setUser, setMyClasses, setTeacherClasses } from './../store/actions';
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

function ProfileMenu({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(
      setUser({
        firstname: null,
        lastname: null,
        token: null,
        bio: '',
        paymentToken: '',
        lastfour: '',
      })
    );
    dispatch(setMyClasses([]));
    dispatch(setTeacherClasses([]));
  }
  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('TeacherProfile')}
        >
          <MaterialIcons name="person" size={24} color="black">
            <Text style={styles.buttonText}> Edit Bio</Text>
          </MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('Payments')}
        >
          <MaterialIcons name="payment" size={24} color="black">
            <Text style={styles.buttonText}> Payments</Text>
          </MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('CreateClass')}
        >
          <MaterialIcons name="person-pin" size={24} color="black">
            <Text style={styles.buttonText}> Host a Class</Text>
          </MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('HostedClasses')}
        >
          <MaterialIcons name="schedule" size={24} color="black">
            <Text style={styles.buttonText}> View your hosted classes</Text>
          </MaterialIcons>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <MaterialIcons name="exit-to-app" size={24} color="black">
            <Text style={styles.logoutText}> Logout</Text>
          </MaterialIcons>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: 'white' },
  button: {
    marginLeft: 30,
    width: screenWidth,
    padding: 10,
    alignItems: 'flex-start',
  },
  buttonText: {
    paddingLeft: 40,
    color: 'black',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22,
  },
  logout: {
    marginTop: 70,
    marginLeft: 40,
    alignItems: 'flex-start',
  },
  logoutText: {
    color: 'black',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22,
  },
  name: {
    color: '#FD7400',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 30,
    marginLeft: 40,
  },
  bio: {
    color: '#B1B0AF',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 18,
    padding: 10,
    marginLeft: 40,
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
  setMyClasses,
  setTeacherClasses,
})(ProfileMenu);
