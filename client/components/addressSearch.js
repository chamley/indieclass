import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setExploreCategory } from '../store/actions';
const KEY = 'AIzaSyBp-6lW9xbvDGhMqKDC_RVqbL-bQgq7tYQ';

function AddressSearch({ setAddress, updateGoogleID }) {
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
        console.log(data);
        console.warn(data);
        setAddress(data.description);
        updateGoogleID(data.place_id);
      }}
    />
  );
}

export default AddressSearch;
