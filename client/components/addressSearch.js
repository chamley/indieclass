import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const KEY = 'AIzaSyAztEADmc2MqnGm-Ia2rojyWNdKMLzBhqY';

function AddressSearch({ setAddress, updateGoogleID }) {
  return (
    <GooglePlacesAutocomplete
      listViewDisplayed={false}
      query={{
        key: KEY,
        language: 'en', // language of the results
      }}
      onFail={(error) => console.error(error)}
      placeholder="Search"
      onPress={(data, details = null) => {
        console.log(data);
        setAddress(data.description);
        updateGoogleID(data.place_id);
      }}
    />
  );
}

export default AddressSearch;
