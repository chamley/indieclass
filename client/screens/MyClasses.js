/* 
Comments:
*/


import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setViewClass } from './../store/actions';
import ClassItem from './../components/classItem'

function MyClasses({setViewClass, navigation}) {

  const myClasses = useSelector(state => state.myClasses);

  function handleClassSelect (cls_id) {
    const cls = myClasses.filter(cls => cls.class_id === cls_id)[0]
    setViewClass(cls);
    navigation.navigate('ViewClass');
  }

  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.category}>Your Upcoming classes</Text>
      <View style={stylesheet.container}>
      <FlatList
        data={myClasses}
        keyExtractor={(item)=>item.class_id}
        renderItem={({ item })=>(
          <ClassItem item={item} handleClassSelect={handleClassSelect}/>
        )}
      />
    </View>
      <Text style={stylesheet.category}>Past Classes</Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  category: {
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

export default connect(mapStateToProps, { setViewClass })(MyClasses);