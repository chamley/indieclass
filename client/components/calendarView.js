import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarStrip from 'react-native-calendar-strip';
import { setViewClass } from './../store/actions';
import ClassItem from './../components/classItem';
import moment from 'moment';

export default function CalendarView({ myClasses, handleClassSelect }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [dailyClasses, setDailyClasses] = useState([]);

  const markedDates = [];

  for (let cls of myClasses) {
    let date = moment(cls.classtime);
    let dots = [
      {
        color: 'red',
        selectedColor: '#FA8128',
      },
    ];
    markedDates.push({
      date,
      dots,
    });
  }

  const onDateSelected = (date) => {
    setSelectedDate({ formattedDate: date.format('YYYY-MM-DD') });
  };

  useEffect(() => {
    const filteredClasses = myClasses.filter(
      (cls) =>
        moment(cls.classtime).format('YYYY-MM-DD') ===
        selectedDate.formattedDate
    );
    setDailyClasses(filteredClasses);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{ height: 120, paddingTop: 30, paddingBottom: 10 }}
        calendarColor="white"
        calendarHeaderStyle={{ color: 'red' }}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black' }}
        markedDates={markedDates}
        iconContainer={{ flex: 0.1 }}
        onDateSelected={onDateSelected}
      />
      {dailyClasses && dailyClasses.length !== 0 ? (
        <FlatList
          data={dailyClasses}
          keyExtractor={(item) => item.class_id}
          renderItem={({ item }) => (
            <ClassItem item={item} handleClassSelect={handleClassSelect} />
          )}
        />
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Break Day!</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 25 },
  textContainer: { alignSelf: 'center' },
  text: { fontSize: 25, paddingTop: 15 },
  allClasses: { alignSelf: 'flex-end', margin: 0 },
});
