import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, FlatList, RefreshControl, ImageBackground } from 'react-native';
import { getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB } from './../store/actions';
import { useDispatch, useSelector, connect } from 'react-redux';
import CategoryItem from './../components/categoryItem'

const backgroundImage = { uri: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/p-419-jackanstey-rp-july2019-0124-a.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=80&usm=15&vib=3&w=1300&s=d050c309c3925e67426b5f8cf876e217" } 


function Explore({ getMyClassesDB, getExploreClassesDB, setExploreCategory, getCategoriesDB, state, navigation }) {

  useEffect(()=>{
    getMyClassesDB(user.user_id);
    getCategoriesDB();
    getExploreClassesDB();
  },[])

  const [ isRefreshing, setIsRefreshing ] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const user = useSelector(state => state.user);
  const myClasses = useSelector(state => state.myClasses);

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
        data={categories}
        keyExtractor={(item)=>item.category_id}
        renderItem={({ item })=>(
          <CategoryItem item={item} handleCategorySelect={handleCategorySelect}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // opacity: 0.5
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