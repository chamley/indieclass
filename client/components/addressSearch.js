import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setExploreCategory } from '../store/actions';
import { KEY } from './../env'
// const KEY = 'AIzaSyANF8rrZ9P8utLBM9bjPmFCS3q2Rm4sIXw';

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
