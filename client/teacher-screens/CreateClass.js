/* 
Comments:

implement this this for dates:
https://www.npmjs.com/package/react-native-modal-datetime-picker

*/

const KEY = 'AIzaSyA2nSvHcabvICJWf1NLob6oTPqpgYdmqd0';

import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native';
import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import { useDispatch } from 'react-redux';
import { teacherAddClassDB } from '../store/actions';
import { useSelector } from 'react-redux';

import { StackActions } from '@react-navigation/native';

import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';



const spacing = 30;



const monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

function CreateClass({ navigation }) {
  const popAction = StackActions.pop(1);


  //use dispatch to add class
  const dispatch = useDispatch();

  //use useSelector add other parameters to our new class
  const data =  useSelector(state => state);
  const {categories, user } = data;
  // console.warn(categories)


  const starterClass = {
    classname: '',
    classlength:0,
    place_id:'',
    signedup:0,
    limit:0,
    cost:0,
    description:'',
    category_id:'9f580fd0-e30d-11ea-88e7-2f709b9055ba',
  }

  // class hook
  const [newClass, setNewClass] = useState(starterClass);
  // methods to update class object below, in order as declared in database model

  // function updateName(cname) {
  //   setNewClass( { ...newClass, name:cname });
  // }

  function updateName(cname) {
    setNewClass( (lastNewClass) => (
        {...lastNewClass, classname:cname })
      );
  }

  //datetime hooks, dont ask questions haha, just check their docs
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    //console.log(currentDate)
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
    setNewClass({ ...newClass, classlength:classLength});
  }
  function updateGoogleID(placeID) {
    setNewClass({ ...newClass, place_id:placeID});
  }
  function updateClassLimit(classLimit) {
    setNewClass({ ...newClass, limit:classLimit});
  }
  function updateCost(classCost) {
    setNewClass({ ...newClass, cost:classCost});
  }
  function updateClassDescription(classDesc) {
    setNewClass({...newClass, description:classDesc})
  }
  function updateCategory(cat) {
    setNewClass({...newClass, category_id:cat})
  }
  // for UI purposes
  const [address, setAddress] = useState('Address of Class');
  
  const [checkmark, setCheckmark] = useState(false);


    // handle form logic here to make sure we dont persist insane things into state
    function handleSubmit() {
      if(!(newClass.classname|| newClass.description||newClass.cost||newClass.classLength)) {
        console.warn("please fill in all fields")
      }
    //hotfix:
    const thedate = newClass.classtime || new Date(1598051730000);
    
    teacherAddClassDB({...newClass, teacher_id:user.user_id, classtime:thedate})(dispatch);
    
    setCheckmark(true);
    setTimeout(() => {
      navigation.dispatch(popAction);
    }, 2000);
    
  }

  return (
    
    <ScrollView style={{ backgroundColor:'#ADD8E6' }}>

    {checkmark && 
      <SafeAreaView><Text>o</Text></SafeAreaView> &&
      <LottieView 
        source={require('../assets/376-check-mark.json')}
        ren   
        autoPlay loop
        />
      }  
        


    {!checkmark &&
    <SafeAreaView>
      <Text> Class Name </Text>
      <TextInput
        style={{ height: 30, width:250, borderColor: 'gray', borderWidth: 2 }}
        onChangeText={text => updateName(text) }
        value={newClass.classname}
        placeholder={' What is the name of your class?'} 
      />
      <View>
        <View>
          <Button onPress={showDatepicker} title={`${monthList[date.getMonth()]} ${date.getDate()}`} />
        </View>
        <View>
          <Button onPress={showTimepicker} title={`${date.getHours()} : ${date.getMinutes()}`}  />
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

      <Text>Description </Text>
      <TextInput
        style={{ height: 60, width:160, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => updateClassDescription(text)}
        value={newClass.description}
        numberOfLines={5}
        textAlignVertical={'top'}
        multiline={true}
      />

      <Text>Price ($)</Text>
      <TextInput
        style={{ height: 30, width:50, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => updateCost(text)}
        value={String(newClass.cost)}
        keyboardType={'decimal-pad'}
      />
      <Text>Class Length (minutes) </Text>
      <TextInput
        style={{ height: 30, width:50, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => updateClassLength(text)}
        value={String(newClass.classlength)}
        keyboardType={'decimal-pad'}
      />
      <Text>Class Size </Text>
      <TextInput
        style={{ height: 30, width:50, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => updateClassLimit(text)}
        value={String(newClass.limit)}
        keyboardType={'decimal-pad'}
      />
      <DropDownPicker
        placeholder="Select a category for your class"
        items={ categories.map(x => {
          return {
            label:x.category_name,
            value:x.category_id
          }})}
        defaultIndex={0}
        containerStyle={{height: 40}}
        onChangeItem={item => updateCategory(item.value)}
        itemStyle={{alignItems:'flex-start'}}
      />
      <Text>{address} </Text>
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="handled"
        placeholder='Search'
        onPress={ (data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //console.log(data, details);
          setAddress(data.description);
          updateGoogleID(data.place_id);
        }}
        query={{
          key: KEY,
          language: 'en',
        }}
      />

      

      <Button
        onPress={handleSubmit}
        title="Create Class"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
      </SafeAreaView>}
    </ScrollView>

  );
}

export default CreateClass;