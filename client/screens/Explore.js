import { mockClass, mockUser } from './../store/reducers'

import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { addMyClassDB, getMyClassesDB, getExploreClassesDB } from './../store/actions';
import { useDispatch, useSelector, connect } from 'react-redux';

function Explore({ addMyClassDB, getMyClassesDB, getExploreClassesDB }) {

  useEffect(()=>{
    console.log(getExploreClassesDB)
    getExploreClassesDB();
  }, [])
  // const addMyClassDispatch = useDispatch();
  // const addMyClassDBDispatch = useDispatch();

  const handlePress = function () {
    // addMyClassDispatch(addMyClass(mockClass))
    // addMyClassDB(mockUser.id, mockClass.id);
  }

  const myClasses = useSelector(state => state.myClasses)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={'add my class test'} onPress={handlePress}/>
      <Text >Discover</Text>
      {console.log(myClasses)}
      <Text style={stylesheet.category}>Health</Text>
      <Text style={stylesheet.category}>Learn</Text>
      <Text style={stylesheet.category}>Music</Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  category:{
    padding:60,
    backgroundColor:'#E2F0F9',
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
// addMyClassDB, getMyClassesDB, 
export default connect(mapStateToProps, {getExploreClassesDB})(Explore);