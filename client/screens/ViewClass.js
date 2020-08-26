import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, connect } from 'react-redux';
import { addMyClassDB } from './../store/actions';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


const getFonts = () => Font.loadAsync({
  // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
  // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
  // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
  'AvenirLTStdBlack': require('./../assets/fonts/AvenirLTStdBlack.otf'),
  'AvenirLTStdBook': require('./../assets/fonts/AvenirLTStdBook.otf'),
  'AvenirLTStdRoman': require('./../assets/fonts/AvenirLTStdRoman.otf'),
});

function ViewClass({ addMyClassDB }) {

  const [ fontsLoaded, setFontsLoaded ] = useState(false);

  const viewClass = useSelector(state => state.viewClass);
  const user = useSelector(state => state.user);
  const myClasses = useSelector(state => state.myClasses);
  const categories = useSelector(state => state.categories);
  // const teacher = // get Teacher details from db using actions
  
  const category = categories.filter(cat=>cat.category_id==viewClass.category_id)[0]
  let hasRegistered = myClasses.includes(viewClass);

  let button;
  if (viewClass.teacher_id === user.user_id) {
    button = (
      <Text 
        style={styles.errorMsg}
      >
      You're teaching this class
      </Text>
    )
  } else {
    if (hasRegistered) {
      button = (
        <Button
          title="Unregister"
          onPress={()=>handleRegister(viewClass)}
          disabled
        />
      )
    } else {
      button = (
        <Button
          title="Register"
          onPress={()=>handleRegister(viewClass)}
        />
      )
    }
  }

  function handleRegister (cls) {
    addMyClassDB(user.token, cls.class_id);
  }

  if(fontsLoaded){
    return (
      <View
        style={styles.category}
      >
        <Text
          style={styles.categoryName}
        >{category.category_name}</Text>
        <Text
          style={styles.classname}
        >{viewClass.classname}</Text>
        <Text
          style={styles.description}
        >{viewClass.description}</Text>
        <Text
          style={styles.address}
        >{viewClass.address}</Text>
        {button}
        {/* <Button
          title="Register"
          onPress={()=>handleRegister(viewClass)}
          // style={styles.button}
        /> */}
        <Text>{hasRegistered ? "has registered" : "has not registered"}</Text>
      </View>
    )
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
  category: {
    padding: 60,
    margin: 10,
    backgroundColor: '#E2F0F9',
    flex: 1
  },
  categoryName: {
    color: 'red',
    fontFamily: 'AvenirLTStdBlack'
  },
  classname: {
    fontSize: 34,
    marginVertical: 30,
    fontFamily: 'AvenirLTStdBlack' 
  },
  description: {
    marginVertical: 30,
    fontFamily: 'AvenirLTStdRoman' 
  },
  address: {
    marginVertical: 30,
    fontFamily: 'AvenirLTStdRoman' 
  },
  errorMsg: {
    color: 'red'
  }
})

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user
  }
}

export default connect(mapStateToProps, { addMyClassDB })(ViewClass);