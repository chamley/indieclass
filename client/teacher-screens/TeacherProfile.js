//boilerplate
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';

//image picker
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//state
import { useSelector } from 'react-redux';

function TeacherProfile({ navigation }) {
  // console.warn('teacherprofile rendered');
  const data = useSelector((state) => state);
  console.log(data);
  const { user } = data;
  // navigate to edit teacher profile place

  const [image, setImage] = useState(null);

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage({ image: result.uri });
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  function handlePicUpload() {
    _pickImage();
  }

  useEffect(() => {
    getPermissionAsync();
  }, []);
  console.log(user);
  return (
    <SafeAreaView style={stylesheet.container}>
      <Text style={stylesheet.title}>
        {user.firstname} {user.lastname}
      </Text>
      <Text style={stylesheet.text}>{user.bio} </Text>
      <TouchableOpacity
        style={stylesheet.button}
        onPress={() => navigation.push('TeacherEditProfile')}
      >
        <Text style={stylesheet.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      {/*      <View style={stylesheet.button}>
        <Button
          onPress={() => navigation.navigate('TeacherEditProfile')}
          title="Edit Profile"
          color="blue"
        /> */}
      <TouchableOpacity
        style={stylesheet.button}
        onPress={() => {
          handlePicUpload;
        }}
      >
        <Text style={stylesheet.buttonText}>Upload A Picture</Text>
      </TouchableOpacity>
      {/*     <Button
        onPress={handlePicUpload}
        title="Upload A Picture"
        color="green"
      /> */}
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDAB8F', paddingTop: 100 },
  title: {
    paddingTop: 30,
    padding: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    padding: 10,
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(206,212,211,0.5)',
    alignSelf: 'center',
    width: 300,
    padding: 20,
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22,
  },
});

export default TeacherProfile;
