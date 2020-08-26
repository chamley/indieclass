import React, { useEffect, useState, useCallback } from 'react';
import { setViewClass } from './../store/actions';
import { StyleSheet, Text } from 'react-native';
import ClassItem from './../components/classItem';
import { useSelector, connect } from 'react-redux';
import MapView from '../components/mapView';

function ExploreFilter({ setViewClass, navigation, state }) {
  const category_id = useSelector((state) => state.category_id);
  const exploreClasses = useSelector((state) => state.exploreClasses);

  const displayedClasses = exploreClasses.filter(
    (cls) => cls.category_id === category_id
  );

  function handleClassSelect(cls_id) {
    const cls = displayedClasses.filter((cls) => cls.class_id === cls_id)[0];
    setViewClass(cls);
    navigation.navigate('ViewClass');
  }

  if (displayedClasses.length > 0) {
    return (
      <MapView
        displayedLocations={displayedClasses}
        handleClassSelect={handleClassSelect}
      />
    );
  } else {
    return <Text>There are no classes in this class category</Text>;
  }
}

const styles = StyleSheet.create({
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
