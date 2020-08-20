import React, { useEffect } from 'react'
import { addMyClass, addMyClassDB } from './../store/actions';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';

function ExploreFilter({ addMyClass, addMyClassDB, state }) {

  const dispatch = useDispatch();

  const category_id = useSelector(state => state.category_id);
  const exploreClasses = useSelector(state => state.exploreClasses);
  const user = useSelector(state => state.user);

  const displayedClasses = exploreClasses.filter(cls => cls.id === category_id)
  console.log('displayedClasses', displayedClasses)

  function handleClassSelect (cls_id) {
    const cls = displayedClasses.filter(cls => cls.id === cls_id)
    console.log('cls', cls);
    addMyClass(cls[0]);
    // addMyClassDB(user.id, cls_id);
  }

  return (
    <View style={stylesheet.container}>
      <FlatList
        data={displayedClasses}
        keyExtractor={(item)=>item.id}
        renderItem={({ item })=>(
          <TouchableOpacity
            style={stylesheet.category}
            onPress={()=>handleClassSelect(item.id)}>
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

export default connect(mapStateToProps, { addMyClass, addMyClassDB })(ExploreFilter);