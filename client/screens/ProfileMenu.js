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
      /*<LinearGradient
        colors={['#F97794', '#623AA2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >*/
      <ImageBackground
        resizeMode={'cover'} // or cover
        style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
        source={require('../assets/images/menu-background.jpg')}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('CreateClass')}
          >
            <Text style={styles.buttonText}>Host a Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('HostedClasses')}
          >
            <Text style={styles.buttonText}>View your hosted classes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('Payments')}
          >
            <Text style={styles.buttonText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('TeacherProfile')}
          >
            <Text style={styles.buttonText}> Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          {/* <Button 
          title={"Logout"}
          onPress={handleLogout}
        /> */}
        </View>
      </ImageBackground>
      // </LinearGradient>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  button: {
    backgroundColor: 'rgba(206,212,211,0.5)',
    // marginHorizontal: 40,
    width: screenWidth,
    // marginVertical: 20,
    padding: 20,
    // borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22,
  },
  logout: {
    // marginHorizontal: 40,
    width: screenWidth,
    // marginVertical: 20,
    backgroundColor: text,
    padding: 20,
    // borderRadius: 10,
    borderColor: text,
    // borderWidth: 2,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 28,
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
