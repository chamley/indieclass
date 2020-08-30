import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, FlatList } from 'react-native';
import { useSelector, connect } from 'react-redux';
import { setViewClass } from './../store/actions';
import ClassItem from './../components/classItem';
import CalendarView from './../components/calendarView';
import { text } from '../styles/colors';

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
    <View style={styles.container}>
      {isEnabled ? (
        <CalendarView
          myClasses={myClasses}
          handleClassSelect={handleClassSelect}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.category}>All classes</Text>
          <View style={styles.container}>
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
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
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
    backgroundColor: '#F4F2F0',
  },
  calendar: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: 'red',
  },
  category: {
    marginBottom: 10,
    paddingTop: 40,
    paddingLeft: 30,
    paddingVertical: 15,
    width: 500,
    fontSize: 30,
    fontFamily: 'AvenirLTStdBook',
    fontWeight: 'bold',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
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
