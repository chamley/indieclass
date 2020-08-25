import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useSelector, connect } from 'react-redux';
import { setUser, setMyClasses } from './../store/actions'

function ProfileMenu({ setUser, setMyClasses, navigation }) {

  const user = useSelector(state => state.user);

  function handleLogout () {
    setUser({
      firstname: null,
      lastname: null,
      token: null,
      paymentToken: '',
      lastfour: '' 
    });
    setMyClasses([]);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.push('CreateClass')}>
        <Text style={stylesheet.item}>(clickable) Host a Class</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('HostedClasses')}>
        <Text style={stylesheet.item}>
          (clickable) View your hosted classes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('Payments')}>
        <Text style={stylesheet.item}>
          (clickable) Payments
        </Text>
    </TouchableOpacity>
    <Button 
      title={"Logout"}
      onPress={handleLogout}
    />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  item: {
    padding: 40,
    backgroundColor: '#E2F0F9',
  },
});

// export default ProfileMenu;
function mapStateToProps(state) {
  return {
    myClasses: state.myClasses,
    exploreClasses: state.exploreClasses,
    categories: state.categories,
    teacherClasses: state.teacherClasses,
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser, setMyClasses })(ProfileMenu);
