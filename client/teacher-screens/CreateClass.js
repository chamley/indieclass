import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Button } from 'react-native';
import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import AddressSearch from '../components/addressSearch';
import { useDispatch } from 'react-redux';
import { teacherAddClassDB } from '../store/actions';
import { useSelector } from 'react-redux';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StackActions } from '@react-navigation/native';

import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const spacing = 30;

// const getFonts = () => Font.loadAsync({
//   // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
//   // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
//   // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
//   // 'AvenirLTStdBlack': require('./../assets/fonts/AvenirLTStdBlack.otf'),
//   // 'AvenirLTStdBook': require('./../assets/fonts/AvenirLTStdBook.otf'),
//   // 'AvenirLTStdRoman': require('./../assets/fonts/AvenirLTStdRoman.otf'),
// });

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function CreateClass({ navigation }) {
  const popAction = StackActions.pop(1);
  const [checkmark, setCheckmark] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  //use dispatch to add class
  const dispatch = useDispatch();

  //use useSelector add other parameters to our new class
  const { categories, user } = useSelector((state) => state);

  const starterClass = {
    classname: '',
    classlength: 0,
    place_id: '',
    signedup: 0,
    limit: 0,
    cost: 0,
    description: '',
    category_id: '9f580fd0-e30d-11ea-88e7-2f709b9055ba',
  };

  // class hook
  const [newClass, setNewClass] = useState(starterClass);
  // methods to update class object below, in order as declared in database model

  // function updateName(cname) {
  //   setNewClass( { ...newClass, name:cname });
  // }

  function updateName(cname) {
    setNewClass((lastNewClass) => ({ ...lastNewClass, classname: cname }));
  }

  //datetime hooks, dont ask questions haha, just check their docs
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [checkmark, setCheckmark] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
  ///// rest of hooks
  function updateClassLength(classLength) {
    setNewClass({ ...newClass, classlength: classLength });
  }
  function updateGoogleID(placeID) {
    setNewClass({ ...newClass, place_id: placeID });
  }
  function updateClassLimit(classLimit) {
    setNewClass({ ...newClass, limit: classLimit });
  }
  function updateCost(classCost) {
    setNewClass({ ...newClass, cost: classCost });
  }
  function updateClassDescription(classDesc) {
    setNewClass({ ...newClass, description: classDesc });
  }
  function updateCategory(cat) {
    setNewClass({ ...newClass, category_id: cat });
  }
  // for UI purposes
  const [address, setAddress] = useState('Address of Class');
  // handle form logic here to make sure we dont persist insane things into state
  function handleSubmit() {
    // Add this formcheck back in when we're done
    // if(!(newClass.classname|| newClass.description||newClass.cost||newClass.classLength)) {
    //   console.warn("please fill in all fields")
    // }
    //hotfix, sorry!:
    const thedate = newClass.classtime || new Date(1598051730000);
    //push it all to redux:
    console.log({ ...newClass, classtime: thedate });
    console.log(user);
    teacherAddClassDB(
      { ...newClass, classtime: thedate },
      user.token
    )(dispatch);
    //show animation and get out:

    setCheckmark(!checkmark);
  }

  return (
    <LinearGradient
      colors={['#F97794', '#623AA2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ backgroundColor: 'transparent' }}
        keyboardShouldPersistTaps="handled"
      >
        {checkmark ? (
          <SafeAreaView>
            <LottieView
              source={require('../assets/376-check-mark.json')}
              onAnimationFinish={() => navigation.dispatch(popAction)} // implement this instead of setimeout
              style={{ height: 150, width: 150 }}
              autoPlay //loop
              loop={false}
              speed={2}
            />
            <Text style={styles.text}> Class Created!</Text>
          </SafeAreaView>
        ) : (
          <SafeAreaView>
            <Text style={styles.label}> Class Name </Text>
            <View style={styles.longTextInput}>
              <TextInput
                onChangeText={(text) => updateName(text)}
                value={newClass.classname}
                placeholder={' What is the name of your class?'}
              />
            </View>
            <View>
              <View style={styles.button}>
                <Button
                  color="transparent"
                  onPress={showDatepicker}
                  title={`${monthList[date.getMonth()]} ${date.getDate()}`}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color="transparent"
                  onPress={showTimepicker}
                  title={`${date.getHours()} : ${date.getMinutes()}`}
                />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <Text style={styles.label}>Address of class</Text>
            <View style={styles.longTextInput}>
              <AddressSearch
                setAddress={setAddress}
                updateGoogleID={updateGoogleID}
              />
            </View>
            <Text style={styles.label}>Description </Text>
            <View style={styles.description}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => updateClassDescription(text)}
                value={newClass.description}
                numberOfLines={5}
                textAlignVertical={'top'}
                multiline={true}
              />
            </View>
            <View style={styles.longTextInput}>
              <DropDownPicker
                placeholder="Select a category for your class"
                items={categories.map((x) => {
                  return {
                    label: x.category_name,
                    value: x.category_id,
                  };
                })}
                defaultIndex={0}
                containerStyle={{ height: 40 }}
                onChangeItem={(item) => updateCategory(item.value)}
                itemStyle={{ alignItems: 'flex-start' }}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Price ($)</Text>
                <View style={styles.shortTextInput}>
                  <TextInput
                    onChangeText={(text) => updateCost(text)}
                    value={String(newClass.cost)}
                    keyboardType={'decimal-pad'}
                  />
                </View>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Minutes </Text>
                <View style={styles.shortTextInput}>
                  <TextInput
                    onChangeText={(text) => updateClassLength(text)}
                    value={String(newClass.classlength)}
                    keyboardType={'decimal-pad'}
                  />
                </View>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Class Size </Text>
                <View style={styles.shortTextInput}>
                  <TextInput
                    onChangeText={(text) => updateClassLimit(text)}
                    value={String(newClass.limit)}
                    keyboardType={'decimal-pad'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.createClass}>
              <Button
                onPress={handleSubmit}
                title="Create Class"
                color="#A91B0D"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  checkmark: {
    paddingTop:40,
    display:'flex',
    alignItems: 'center',
    justifyContent:'center'

  },
  label: {
    padding: 10,
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 30,
  },
  shortTextInput: {
    height: 30,
    width: 50,
    backgroundColor: 'rgba(206,212,211,0.3)',
    borderColor: 'white',
    borderWidth: 0.5,
    marginBottom: 10,
    marginLeft: 40,
  },
  longTextInput: {
    height: 30,
    width: 300,
    backgroundColor: 'rgba(206,212,211,0.3)',
    borderColor: 'white',
    borderWidth: 0.5,
    marginBottom: 10,
    marginLeft: 35,
  },
  description: {
    height: 80,
    width: 300,
    backgroundColor: 'rgba(206,212,211,0.3)',
    borderColor: 'white',
    borderWidth: 0.5,
    marginLeft: 35,
    marginBottom: 20,
  },
  // className: {
  //   height: 30,
  //   width:250,
  //   borderColor: 'gray',
  //   borderWidth: 2,
  //   width:Dimensions.get('window').width,
  //   backgroundColor:'white',

  // },
  // classDescription: {height: 60,
  //   width: 160,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   width:Dimensions.get('window').width,
  //   backgroundColor:'white',
  // },
  // timeAndDate: {
  //   flexDirection: 'row',
  // },
  // date: {
  //   margin: 10,
  //   flex: 1,
  // },
  // time: {
  //   margin: 10,
  //   flex: 1,
  // },
  // button: {
  //   height: 30,
  //   width: 300,
  //   marginLeft: 35,
  //   backgroundColor: 'rgba(206,212,211,0.3)',
  // },
  // row: {
  //   flex: 1,
  //   flexDirection: 'row',
  // },
  // createClass: {
  //   width: 300,
  //   marginLeft: 35,
  //   marginTop: 10,
  // },
});

export default CreateClass;
