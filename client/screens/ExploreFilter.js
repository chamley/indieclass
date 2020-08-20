import React from 'react'
import { setViewClass } from './../store/actions';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, connect } from 'react-redux';

function ExploreFilter({ setViewClass, navigation ,state }) {

  const category_id = useSelector(state => state.category_id);
  const exploreClasses = useSelector(state => state.exploreClasses);
  const user = useSelector(state => state.user);

  const displayedClasses = exploreClasses.filter(cls => cls.category_id === category_id)

  function handleClassSelect (cls_id) {
    const cls = displayedClasses.filter(cls => cls.class_id === cls_id)[0]
    setViewClass(cls);
    navigation.navigate('ViewClass');
    // addMyClass(cls[0]);
    // addMyClassDB(user.id, cls_id);
  }

  return (
    <View style={stylesheet.container}>
      <FlatList
        data={displayedClasses}
        keyExtractor={(item)=>item.class_id}
        renderItem={({ item })=>(
          <TouchableOpacity
            style={stylesheet.class}
            onPress={()=>handleClassSelect(item.class_id)}
          >{console.log('rendered class item', item)}
            <Text>{item.classname}</Text>
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
  class: {
    padding: 10,
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

export default connect(mapStateToProps, { setViewClass })(ExploreFilter);