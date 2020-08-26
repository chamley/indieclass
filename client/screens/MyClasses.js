import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, FlatList } from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setViewClass } from './../store/actions';
import ClassItem from './../components/classItem';
import CalendarView from './../components/calendarView';

function MyClasses({ setViewClass, navigation }) {
  const myClasses = useSelector((state) => state.myClasses);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  function handleClassSelect(cls_id) {
    const cls = myClasses.filter((cls) => cls.class_id === cls_id)[0];
    setViewClass(cls);
    navigation.navigate('ViewClass');
  }

  return (
    <View style={stylesheet.container}>
      {isEnabled ? (
        <CalendarView
          myClasses={myClasses}
          handleClassSelect={handleClassSelect}
        />
      ) : (
        <View style={stylesheet.container}>
          <Text style={stylesheet.category}>All classes</Text>
          <View style={stylesheet.container}>
            <FlatList
              data={myClasses}
              keyExtractor={(item) => item.class_id}
              renderItem={({ item }) => (
                <ClassItem item={item} handleClassSelect={handleClassSelect} />
              )}
            />
          </View>
        </View>
      )}
      <View style={{ marginBottom: 20 }}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  calendar: {
    flex: 1
  },
  list: {
    flex: 1,
    backgroundColor: 'red'
  },
  category: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#E2F0F9',
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

export default connect(mapStateToProps, { setViewClass })(MyClasses);
