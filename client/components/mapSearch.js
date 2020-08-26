import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const KEY = 'AIzaSyBp-6lW9xbvDGhMqKDC_RVqbL-bQgq7tYQ';

function MapSearch({ setPlaceID }) {
  return (
    <GooglePlacesAutocomplete
      listViewDisplayed={false}
      query={{
        key: KEY,
        language: 'en',
      }}
      onFail={(error) => console.error(error)}
      placeholder="Search"
      onPress={(data, details = null) => {
        setPlaceID(data.place_id);
      }}
    />
  );
}

export default MapSearch;
