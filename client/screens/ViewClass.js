import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, connect } from 'react-redux';
import { addMyClassDB } from './../store/actions';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import moment from 'moment';
import { getTeacher } from './../ApiService/ApiService';
import { Zocial } from '@expo/vector-icons';

const getFonts = () =>
  Font.loadAsync({
    // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
    // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
    // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
    AvenirLTStdBlack: require('./../assets/fonts/AvenirLTStdBlack.otf'),
    AvenirLTStdBook: require('./../assets/fonts/AvenirLTStdBook.otf'),
    AvenirLTStdRoman: require('./../assets/fonts/AvenirLTStdRoman.otf'),
  });

function ViewClass({ addMyClassDB }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [teacher, setTeacher] = useState({
    firstname: 'John',
    lastname: 'Potato',
    bio: 'is a Potato',
  });

  const viewClass = useSelector((state) => state.viewClass);
  const user = useSelector((state) => state.user);
  const myClasses = useSelector((state) => state.myClasses);
  const categories = useSelector((state) => state.categories);
  const teacherClasses = useSelector((state) => state.teacherClasses);

  // api call - update teacher state
  getTeacher(viewClass.class_id, teacher, setTeacher);

  const category = categories.filter(
    (cat) => cat.category_id == viewClass.category_id
  )[0];

  let button;

  if (!user.token) {
    button = <Text style={styles.errorMsg}>Please sign in to register</Text>;
  } else if (
    teacherClasses.map((item) => item.class_id).includes(viewClass.class_id)
  ) {
    // user_id does not exist
    button = <Text style={styles.errorMsg}>You're teaching this class</Text>;
  } else {
    if (myClasses.map((item) => item.class_id).includes(viewClass.class_id)) {
      button = (
        <Button
          title="Already registered"
          onPress={() => handleRegister(viewClass)}
          disabled
        />
      );
    } else {
      button = (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRegister(viewClass)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      );
    }
  }

  let signedup;
  if (registered) {
    signedup = (
      <Text style={styles.address}>
        {viewClass.signedup + 1} of {viewClass.limit} places taken
      </Text>
    );
  } else {
    signedup = (
      <Text style={styles.address}>
        {viewClass.signedup} of {viewClass.limit} places taken
      </Text>
    );
  }

  function handleRegister(cls) {
    addMyClassDB(user.token, cls.class_id);
    setRegistered(true);
  }

  if (fontsLoaded) {
    return (
      <View style={styles.category}>
        <Text style={styles.categoryName}>{category.category_name}</Text>
        <Text style={styles.classname}>{viewClass.classname}</Text>
        <Text style={styles.classtime}>
          {moment(viewClass.classtime).format('Do MMM h:mm a')}
        </Text>
        <Text style={styles.address}>{viewClass.address}</Text>
        {signedup}
        <View style={styles.teacherDetails}>
          <View style={styles.icon}>
            <Zocial name="persona" size={30} color="grey" />
          </View>
          <View>
            <Text style={styles.teacherName}>
              {teacher.firstname} {teacher.lastname}
            </Text>
            <Text style={styles.address}>{teacher.bio}</Text>
          </View>
        </View>
        <Text
          style={
            (styles.address,
            { color: '#B1B0AF', fontFamily: 'AvenirLTStdBook' })
          }
        >
          Description
        </Text>
        <Text style={styles.description}>{viewClass.description}</Text>
        {/* Display teacher name and bio */}

        {button}
      </View>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

const styles = StyleSheet.create({
  teacherDetails: {
    borderColor: '#FD7400',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    marginVertical: 20,
  },
  category: {
    padding: 20,
    margin: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  categoryName: {
    fontFamily: 'AvenirLTStdBlack',
  },
  classname: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 5,
    fontFamily: 'AvenirLTStdBook',
  },
  teacherName: {
    fontSize: 20,
    color: '#FD7400',
    fontFamily: 'AvenirLTStdBook',
  },
  description: {
    marginBottom: 50,
    fontSize: 18,
    fontFamily: 'AvenirLTStdBook',
  },
  address: {
    marginVertical: 5,
    fontSize: 15,
    fontFamily: 'AvenirLTStdRoman',
  },
  classtime: {},
  errorMsg: {
    color: 'red',
    fontFamily: 'AvenirLTStdBook',
  },
  icon: {
    marginRight: 30,
    marginTop: 7,
    marginLeft: 10,
  },
  register: {},
  button: {
    backgroundColor: '#FD7400',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F5FF00',
  },
  buttonText: {
    fontFamily: 'AvenirLTStdBook',
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
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

export default connect(mapStateToProps, { addMyClassDB })(ViewClass);
