import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';

function AddCCScreen({ error, submitted, onSubmit }) {
  //stripe website has a list of valid fake cards
  const demoCard = {
    valid: true,
    values: {
      number: '4242424242424242',
      expiry: '02/22',
      cvc: '222',
      type: 'visa', // possible values: [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
      name: 'Johnny Hello',
      postalCode: '12345',
    },
  };

  const [cardData, setCardData] = useState(demoCard);

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#F4F2F0', padding: 40 }}>
        <CreditCardInput
          requiresName
          cardImageFront={require('../assets/images/credit_card_front.png')}
          cardImageBack={require('../assets/images/credit_card_back.png')}
          onChange={(cardData) => setCardData({ cardData })}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSubmit(demoCard)}
        >
          <Text style={styles.buttonText}>Add This Card</Text>
        </TouchableOpacity>
        {error && (
          <View style={styles.alertWrapper}>
            <View style={styles.alertIconWrapper}>
              <FontAwesome
                name="exclamation-circle"
                size={20}
                style={{ color: '#c22' }}
              />
            </View>
            <View style={styles.alertTextWrapper}>
              <Text style={styles.alertText}>{error}</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100,
  },
  button: {
    backgroundColor: '#FD7400',
    margin: 10,
    alignSelf: 'center',
    padding: 10,
    width: 300,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F5FF00',
  },
  buttonText: {
    fontFamily: 'AvenirLTStdBook',
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400',
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
});

export default AddCCScreen;
