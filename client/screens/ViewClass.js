import React, { useState } from 'react'
import { StyleSheet, Text, View, Button} from 'react-native';
import { useSelector, connect } from 'react-redux';
import { addMyClass, addMyClassDB } from './../store/actions';

function ViewClass({ addMyClass, addMyClassDB, state }) {

  const viewClass = useSelector(state => state.viewClass);
  const user = useSelector(state => state.user);
  const myClasses = useSelector(state => state.myClasses);
  let hasRegistered = myClasses.includes(viewClass);
  
  // let [ hasRegistered, setHasRegistered ] = useState(false)
  
  // setHasRegistered(myClasses.includes(viewClass));

  function handleRegister () {
    addMyClassDB(user.user_id, viewClass.class_id);
    // setHasRegistered(true);
    console.log('myclasses after are ', myClasses);
  }

  return (
    <View
      style={stylesheet.category}
    >
      <Text>{viewClass.category_name}</Text>

      <Text>{viewClass.description}</Text>
      <Button title="Register" onPress={()=>handleRegister(viewClass.classname)}/>
      <Text>{hasRegistered ? "has registered" : "has not registered"}</Text>
    </View>
  )
}

const stylesheet = StyleSheet.create({
  category: {
    padding: 60,
    margin: 10,
    backgroundColor: '#E2F0F9',
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

export default connect(mapStateToProps, { addMyClass, addMyClassDB })(ViewClass);