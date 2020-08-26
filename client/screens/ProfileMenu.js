import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useSelector, connect } from 'react-redux';
import { setUser, setMyClasses } from './../store/actions'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { pri, priTL, sec, secTL, ter, terTL, acc, accTL, text, textTL } from './../styles/colors'

const getFonts = () => Font.loadAsync({
  // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
  // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
  // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
  'AvenirLTStdBlack': require('./../assets/fonts/AvenirLTStdBlack.otf'),
  'AvenirLTStdBook': require('./../assets/fonts/AvenirLTStdBook.otf'),
  'AvenirLTStdRoman': require('./../assets/fonts/AvenirLTStdRoman.otf'),
});

function ProfileMenu({ setUser, setMyClasses, navigation }) {

  const [ fontsLoaded, setFontsLoaded ] = useState(false);
  const user = useSelector(state => state.user);

  function handleLogout () {
    setUser({
      firstname: null,
      lastname: null,
      token: null,
      paymentToken: '',
      lastfour: '' 
    });
    setMyClasses([]);
  }
  if(fontsLoaded){
    return (
      <View
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('CreateClass')}
        >
          <Text
            style={styles.buttonText}
          >
            Host a Class
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('HostedClasses')}
        >
          <Text
            style={styles.buttonText}
          >
            View your hosted classes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('Payments')}
        >
          <Text 
            style={styles.buttonText}
          >
            Payments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('TeacherProfile')}
        >
        <Text style={styles.buttonText}> Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logout}
          onPress={handleLogout}
        >
          <Text 
            style={styles.logoutText}
          >
            Logout
          </Text>
        </TouchableOpacity>
        {/* <Button 
          title={"Logout"}
          onPress={handleLogout}
        /> */}
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
  button: {
    backgroundColor: pri,
    marginHorizontal: 40,
    marginVertical: 20,
    padding: 30,
    borderRadius: 10,
    borderColor: text,
    borderWidth: 2,
    alignItems: 'center'
  },
  buttonText: {
    color: text,
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22
  },
  logout: {
    marginHorizontal: 40,
    marginVertical: 20,
    backgroundColor: text,
    padding: 30,
    borderRadius: 10,
    borderColor: text,
    borderWidth: 2,
    alignItems: 'center'
  },
  logoutText: {
    color: '#fff',
    fontFamily: 'AvenirLTStdBlack',
    fontSize: 28
  }
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

export default connect(mapStateToProps, { setUser, setMyClasses })(ProfileMenu);
