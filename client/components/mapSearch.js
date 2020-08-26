import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KEY } from './../env'

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
        console.log(data.place_id);
        setPlaceID(data.place_id);
      }}
    />
  );
}

export default MapSearch;
