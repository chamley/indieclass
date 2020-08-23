import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from "react-native";

export default function ClassItem({ item, handleClassSelect }) {

  return (
    <TouchableOpacity
      style={styles.classCard}
      onPress={()=>handleClassSelect(item.class_id)}
    ><LinearGradient
      colors={['rgba(255,155,74,0.7)', '#be03fc']}
      style={styles.background}
      start={{x:0.7,y:1}}
      end={{x:1,y:1}}
    />
      <View style={styles.dateContainer}>  
        <Text
          style={styles.date}
        >{moment(item.classtime).format('h:mm a')}
        </Text>
        <Text
          style={styles.date}
        >{moment(item.classtime).format('Do MMM')}
        </Text>
        <Text
          style={styles.length}
        >({item.classlength} minutes)
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text
          style={styles.heading}
        >{item.classname}
        </Text>
        <Text
          style={styles.address}
        >{item.address}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  classCard: {
    width: screenWidth,
    flexDirection: 'row',
    borderColor: '#333',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  background :{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  dateContainer: {
    padding: 10,
    flex: 1,
    alignItems: 'flex-end'
  },
  detailContainer: {
    padding: 10,
    flex: 3
  },
  heading: {
    paddingBottom: 5,
    fontSize: 27,
    fontWeight: "500",
    color: '#be03fc'
  },
  date: {
    fontSize: 16,
    color: '#be03fc'
  },
  length: {
    fontSize: 13,
    color: '#be03fc'
  },
  address: {
    fontSize: 12,
    color: '#be03fc'
  }
})