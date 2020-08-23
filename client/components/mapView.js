import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

export default function CarouselMap() {
  const locations = {
    initialPosition: {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0921,
    },
    markers: [],
    coordinates: [
      {
        name: 'Burger',
        latitude: 37.8025259,
        longitude: -122.4351431,
        image: { uri: 'https://source.unsplash.com/1600x900/?food,burger' },
      },
      {
        name: 'Pizza',
        latitude: 37.7946386,
        longitude: -122.421646,
        image: { uri: 'https://source.unsplash.com/1600x900/?food,pizza' },
      },
      {
        name: 'Soup',
        latitude: 37.7665248,
        longitude: -122.4165628,
        image: { uri: 'https://source.unsplash.com/1600x900/?food,soup' },
      },
      {
        name: 'Sushi',
        latitude: 37.7834153,
        longitude: -122.4527787,
        image: { uri: 'https://source.unsplash.com/1600x900/?food,sushi' },
      },
      {
        name: 'Curry',
        latitude: 37.7948105,
        longitude: -122.4596065,
        image: { uri: 'https://source.unsplash.com/1600x900/?food,curry' },
      },
    ],
  };

  const onCarouselItemChange = (index) => {
    let location = locations.coordinates[index];

    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    locations.markers[index].showCallout();
  };

  const onMarkerPressed = (location, index) => {
    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    _carousel.snapToItem(index);
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Image style={styles.cardImage} source={item.image} />
    </View>
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
        <Marker
          draggable
          coordinate={{ latitude: 37.7825259, longitude: -122.4351431 }}
        ></Marker>
        {locations.coordinates.map((marker, index) => (
          <Marker
            key={marker.name}
            ref={(ref) => (locations.markers[index] = ref)}
            onPress={() => onMarkerPressed(marker, index)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={locations.coordinates}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={270}
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
    height: 200,
    width: 270,
    padding: 24,
    borderRadius: 15,
  },
  cardImage: {
    height: 80,
    width: 270,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardTitle: {
    color: 'black',
    fontSize: 22,
    alignSelf: 'center',
  },
});
