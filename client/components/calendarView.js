import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { setViewClass } from './../store/actions';
import ClassItem from './../components/classItem';
import { pri, priTL, sec, secTL, ter, terTL, acc, accTL, text, textTL } from './../styles/colors'
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import moment from 'moment';

const getFonts = () => Font.loadAsync({
  // 'RobotoMonoThin': require('./../assets/fonts/RobotoMonoThin.ttf'),
  // 'RobotoMonoMedium': require('./../assets/fonts/RobotoMonoMedium.ttf'),
  // 'RobotoMonoBold': require('./../assets/fonts/RobotoMonoBold.ttf'),
  'AvenirLTStdBlack': require('./../assets/fonts/AvenirLTStdBlack.otf'),
  'AvenirLTStdBook': require('./../assets/fonts/AvenirLTStdBook.otf'),
  'AvenirLTStdRoman': require('./../assets/fonts/AvenirLTStdRoman.otf'),
});

export default function CalendarView({ myClasses, handleClassSelect }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dailyClasses, setDailyClasses] = useState([]);
  const markedDates = [];

  for (let cls of myClasses) {
    let date = moment(cls.classtime);
    let dots = [
      {
        color: 'yellow',
        selectedColor: 'black',
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
  
  if(fontsLoaded){
    return (
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
        <CalendarStrip
          scrollable
          style={{ height: 120, paddingTop: 30, paddingBottom: 10 }}
          calendarColor={'#FA8128'}
          calendarHeaderStyle={{ color: 'white' }}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          markedDates={markedDates}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={onDateSelected}
        />
        {dailyClasses && dailyClasses.length !== 0 ? (
          <FlatList
            data={dailyClasses.sort((a, b)=> b.classtime - a.classtime)}
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
        <View style={styles.fullList}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>The full list of classes you've registered for are</Text>
          </View>
          <FlatList
              data={myClasses}
              keyExtractor={(item) => item.class_id}
              renderItem={({ item }) => (
                <ClassItem item={item} handleClassSelect={handleClassSelect} />
              )}
            />
        </View>
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    )
  }   
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
  },
  textContainer: {
    alignSelf: 'center'
  },
  text: {
    fontSize: 25, 
    paddingTop: 15 
  },
  header: {
    alignSelf: 'center',
    fontFamily: 'AvenirLTStdBlack',
    color: '#fff',
    fontSize: 16,
    padding: 10
  },
  headerContainer: {
    backgroundColor: ter
  },
  fullList: {
    flex: 1, 
  },
  calendarContainer: {
    flex: 1,
  }
});
