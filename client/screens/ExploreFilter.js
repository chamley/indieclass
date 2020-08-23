import React, { useEffect, useState, useCallback } from 'react';
import { setViewClass } from './../store/actions';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ClassItem from './../components/classItem';
import { useSelector, connect } from 'react-redux';
import MapView from '../components/mapView';

function ExploreFilter({ setViewClass, navigation, state }) {
  const category_id = useSelector((state) => state.category_id);
  const exploreClasses = useSelector((state) => state.exploreClasses);
  const user = useSelector((state) => state.user);

  const displayedClasses = exploreClasses.filter(
    (cls) => cls.category_id === category_id
  );

  function handleClassSelect(cls_id) {
    const cls = displayedClasses.filter((cls) => cls.class_id === cls_id)[0];
    setViewClass(cls);
    navigation.navigate('ViewClass');
  }

  return (
    <MapView displayedLocations={displayedClasses} />
    /*     <View style={stylesheet.container}>
      <FlatList
        // refreshControl = {<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
        data={displayedClasses}
        keyExtractor={(item) => item.class_id}
        renderItem={({ item }) => (
          <ClassItem item={item} handleClassSelect={handleClassSelect} />
        )}
      />
    </View> */
  );
}

const stylesheet = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user,
  };
}

export default connect(mapStateToProps, { setViewClass })(ExploreFilter);
