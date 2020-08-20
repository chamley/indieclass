import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

function ExploreFilter({ classList }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      

    </View>
  );
}

const stylesheet = StyleSheet.create({
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

export default connect(mapStateToProps, {getExploreClassesDB})(ExploreFilter);