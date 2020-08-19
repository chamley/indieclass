/* 
Comments:

implement this this for dates:
https://www.npmjs.com/package/react-native-modal-datetime-picker

*/


import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native';
import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import DropDownPicker from 'react-native-dropdown-picker';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useSelector, useDispatch } from 'react-redux'

// import action thing 

const monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
const categoryList = ["Health", "Learn", "Music"]



function CreateClass() {


  // class name hooks
  const [name, setName] = useState('');

  //datetime hooks, send date back to database
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  // category type of class 
  const [category, setCategory] = useState('')
  
  // other hooks
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  
  const [address, setAddress] = useState('Address of Class');
  const [gpid, setGpid] = useState();

  // logic for datetime set
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


  function handleSubmit() {
    // empty field logic goes here
    // if !(name && date && time) etc..  console.warn and prevent submit
    if( !(name && date && description && price && address) ) {
      console.warn('please fill in all fields');
    } else {
      // API endpoints go here + redux logic goes here
      console.warn(`
        ${name}
        ${date}
        ${description}
        ${address}
        ${gpid}
        ${category}
      `)
    }
  
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:50 }}>
      
      <Text> Class Name </Text>
      <TextInput
        style={{ height: 30, width:250, borderColor: 'gray', borderWidth: 2 }}
        onChangeText={text => setName(text)}
        value={name}
        placeholder={' What is the name of your class?'} 
      />

      <View>
        <View>
          <Button onPress={showDatepicker} title={`${monthList[date.getMonth()-1]} ${date.getDate()}`} />
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
        style={{ height: 60, width:160, borderColor: 'gray', borderWidth: 2 }}
        onChangeText={text => setDescription(text)}
        value={description}
        numberOfLines={5}
        textAlignVertical={'top'}
        multiline={true}
      />

      <Text>Price ($)</Text>
      <TextInput
        style={{ height: 30, width:50, borderColor: 'gray', borderWidth: 2 }}
        onChangeText={text => setPrice(text)}
        value={price}
        keyboardType={'decimal-pad'}
      />

      <DropDownPicker
        placeholder="Select a category for your class"
        items={ categoryList.map(x => {
          return {
            label:x,
            value:x
          }})}
        defaultIndex={0}
        containerStyle={{height: 40}}
        onChangeItem={item => setCategory(item)}
        itemStyle={{alignItems:'flex-start'}}
      />

      <Text>{address} </Text>
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="handled"
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //console.log(data, details);
          setAddress(data.description);
          setGpid(data.place_id)
        }}
        query={{
          key: 'AIzaSyCEnYeFcItAllyocAU0yof_YFbu_6GeYSs',
          language: 'en',
        }}
      />

      <Button
        onPress={handleSubmit}
        title="Create Class"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
}

export default CreateClass;