import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB } from './../store/actions';
import { useDispatch, useSelector, connect } from 'react-redux';
import CategoryItem from './../components/categoryItem'

function Explore({ getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB, state, navigation }) {

  useEffect(()=>{
    getMyClassesDB(user.user_id);
    getCategoriesDB();
    getMyClassesDB();
    getExploreClassesDB();
  },[])

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const user = useSelector(state => state.user);
  const myClasses = useSelector(state => state.myClasses);
  console.log('myclasses on load', myClasses)

  const handleCategorySelect = function (categoryID) {
    dispatch(setExploreCategory(categoryID));
    navigation.navigate('ExploreFilter');
  }

  return (
    <View style={stylesheet.container}>
      <FlatList
        data={categories}
        keyExtractor={(item)=>item.category_id}
        renderItem={({ item })=>(
          <CategoryItem item={item} handleCategorySelect={handleCategorySelect}/>
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

export default connect(mapStateToProps, { getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB })(Explore);