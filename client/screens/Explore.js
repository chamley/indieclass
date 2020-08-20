import { mockClass, mockUser } from './../store/reducers'
import { mockClassArr } from './../store/mockClasses';

import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { addMyClassDB, getMyClassesDB, getExploreClassesDB } from './../store/actions';
import { useDispatch, useSelector, connect } from 'react-redux';

function Explore({ addMyClassDB, getMyClassesDB, getExploreClassesDB, state }) {

  // useEffect(()=>{
  //   getExploreClassesDB();
  // }, [])
  
  const handlePress = function () {
    {console.log('exploreclasses in press', exploreClasses)}
  }

  const categories = useSelector(state => state.categories)

  return (
    <View style={stylesheet.container}>
      <Button title={'add my class test'} onPress={handlePress}/>
      <FlatList
        data={categories}
        keyExtractor={(item)=>item.id}
        renderItem={({ item })=>(
          <TouchableOpacity style={stylesheet.category}><Text>{item.category}</Text></TouchableOpacity>
        )}
      />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  category:{
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

export default connect(mapStateToProps, {getExploreClassesDB})(Explore);