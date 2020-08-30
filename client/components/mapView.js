import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MapSearch from './mapSearch';
import moment from 'moment';
const SERVER_URL = 'http://10.0.2.2:3001';

export default function CarouselMap({ displayedLocations, handleClassSelect }) {
  const [placeID, setPlaceID] = useState('');

  const locations = {
    markers: [],
  };

  useEffect(() => {
    fetch(`${SERVER_URL}/location/${placeID}`)
      .then((res) => res.json())
      .then((location) => {
        _map.animateToRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        });
      });
  }, [placeID]);

  const onCarouselItemChange = (index) => {
    let location = displayedLocations[index];

    _map.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    locations.markers[index].showCallout();
  };

  const onMarkerPressed = (location, index) => {
    _map.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    _carousel.snapToItem(index);
  };

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleClassSelect(item.class_id)}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: `https://source.unsplash.com/1600x900/?${
              item.classname.split(' ')[0]
            }`,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.classname}</Text>
          <Text style={styles.details}>
            {moment(item.classtime).format('YYYY-MM-DD h:mm a')}
          </Text>
          <Text style={styles.details}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(map) => (_map = map)}
        showsUserLocation={true}
        style={styles.map}
      >
        {displayedLocations.map((marker, index) => (
          <Marker
            key={marker.class_id}
            ref={(ref) => (locations.markers[index] = ref)}
            onPress={() => onMarkerPressed(marker, index)}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
          >
            <Callout>
              <Text>{marker.classname}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <MapSearch style={styles.search} setPlaceID={setPlaceID} />

      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={displayedLocations}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={160}
        removeClippedSubviews={false}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    minHeight: Math.round(Dimensions.get('window').height) - 120,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  search: {
    position: 'absolute',
    top: 20,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
    height: 220,
    width: 160,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  textContainer: {
    padding: 8,
  },
  cardImage: {
    height: 110,
    width: 160,
    alignSelf: 'flex-start',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'AvenirLTStdBook',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  details: {
    color: '#B1B0AF',
    fontSize: 13,
    fontFamily: 'AvenirLTStdBook',
    alignSelf: 'center',
  },
});
