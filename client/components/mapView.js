import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

export default function CarouselMap({ displayedLocations, handleClassSelect }) {
  const locations = {
    initialPosition: {
      latitude: displayedLocations[0].lat,
      longitude: displayedLocations[0].lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0921,
    },
    markers: [],
  };

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
    <TouchableOpacity onPress={()=>handleClassSelect(item.class_id)}>
    <View style={styles.cardContainer} >
      <Text style={styles.cardTitle}>{item.classname}</Text>
      <Text style={styles.details}>Time: {item.classtime}</Text>
      <Text style={styles.details}>Length: {item.classlength}</Text>
      <Text style={styles.details}>Address: {item.address}</Text>
      <Text style={styles.details}>{item.description}</Text>
      <Image style={styles.cardImage} source={{uri:`https://source.unsplash.com/1600x900/?${item.classname.split(' ').[0]}`}} />
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
        initialRegion={locations.initialPosition}
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
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={displayedLocations}
  
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={320}
        removeClippedSubviews={false}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 180,
    width: 320,
    padding: 24,
    borderRadius: 15,
  },
  cardImage: {
    height: 180,
    width: 120,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 15,
  },
  cardTitle: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  details: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
});
