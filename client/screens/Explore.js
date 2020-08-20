import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { getMyClassesDB, getExploreClassesDB, setExploreCategory } from './../store/actions';
import { useDispatch, useSelector, connect } from 'react-redux';

function Explore({ getMyClassesDB, getExploreClassesDB, setExploreCategory, state, navigation }) {

  useEffect(()=>{
    // getMyClassesDB();
    getExploreClassesDB();
  },[])

  const exploreClasses = useSelector(state => state.exploreClasses);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const category_id = useSelector(state => state.category_id);

  const handleCategorySelect = function (categoryID) {
    dispatch(setExploreCategory(categoryID))
    console.log(category_id) // TODO FIX: displayed last clicked category ID, not current clicked category ID
    navigation.navigate('ExploreFilter')
    // console.log('exploreClasses - full list from db', exploreClasses)
  }

  return (
    <View style={stylesheet.container}>
      <FlatList
        data={categories}
        keyExtractor={(item)=>item.id}
        renderItem={({ item })=>(
          <TouchableOpacity
            style={stylesheet.category}
            onPress={()=>handleCategorySelect(item.id)}>
            <Text>{item.category}</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, { getMyClassesDB, getExploreClassesDB, setExploreCategory })(Explore);