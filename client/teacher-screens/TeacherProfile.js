//boilerplate
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';

//image picker
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


//state
import { useSelector } from 'react-redux'

function TeacherProfile({navigation}) {
  console.warn('teacherprofile rendered')
  const data = useSelector(state => state)

  const { user } = data;
  // navigate to edit teacher profile place


  // const [image, setImage] = useState(null);

  // async function getPermissionAsync() {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // };

  // _pickImage = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (!result.cancelled) {
  //       setImage({ image: result.uri });
  //     }
  //     console.log(result);
  //   } catch (E) {
  //     console.log(E);
  //   }
  // };

  // function handlePicUpload() {
  //   _pickImage();
  // }

  // useEffect(()=>{
  //   getPermissionAsync();
  // },[])
  console.warn(user.bio);
  return(
    <SafeAreaView>
      <Text style={stylesheet.title}>{user.firstname} {user.lastname}</Text>
      <Text style={stylesheet.text}>{user.bio} </Text>
      <View style={stylesheet.button}>
        <Button
        onPress={()=> navigation.navigate('TeacherEditProfile')} 
        title="Edit Profile"
        color="blue"
        />
      </View>
      

    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  title:{
    paddingTop:30,
    padding:20,
  },
  text: {
    padding:10,
  },
  button: {

    width:Dimensions.get('window').width,

  }
})

// <Button
// onPress={handlePicUpload} 
// title="Upload A Picture"
// color="green"
// />
// {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

export default TeacherProfile