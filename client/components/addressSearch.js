import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setExploreCategory } from '../store/actions';
import { KEY } from './../env';
// const KEY = 'AIzaSyD4vvYE5KA-Rdc_To-YbupkG4RAZTJbnxA';

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
        setAddress(data.description);
        updateGoogleID(data.place_id);
      }}
      styles={{
        textInputContainer: {
          width: 300,
          backgroundColor: 'white',
          // marginLeft: 35,
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  );
}

export default AddressSearch;
