import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB } from './../store/actions';
import { useDispatch, useSelector, connect } from 'react-redux';
import CategoryItem from './../components/categoryItem'
import { Dimensions } from "react-native";

function Explore({ getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB, state, navigation }) {

  useEffect(()=>{
    getCategoriesDB();
    getExploreClassesDB();
  },[])

  const [ isRefreshing, setIsRefreshing ] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const user = useSelector(state => state.user);
  const myClasses = useSelector(state => state.myClasses);
  const images = [
    require("./../assets/images/dance.jpg"),
    require("./../assets/images/health.jpg"),
    require("./../assets/images/cooking.jpg"),
    require("./../assets/images/meetup.jpg")
  ]

  let categoriesImg = categories.map((category, index)=>{
    return {...category, img: images[index]}
  })

  const handleCategorySelect = function (categoryID) {
    getExploreClassesDB();
    dispatch(setExploreCategory(categoryID));
    navigation.navigate('ExploreFilter');
  }

  const handleRefresh = useCallback (async () => {
    setIsRefreshing(true);
    await getExploreClassesDB();
    setIsRefreshing(false);
  }); 

  return (
      <View style={styles.container}>
        <FlatList
          refreshControl = {<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
          data={categoriesImg}
          keyExtractor={(item)=>item.category_id}
          renderItem={({ item })=>(
            <CategoryItem item={item} handleCategorySelect={handleCategorySelect}/>
          )}
        />
      </View>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
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