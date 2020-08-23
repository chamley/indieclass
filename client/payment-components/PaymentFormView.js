
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */

function PaymentFormView ({error, submitted, onSubmit}) {
 
  // constructor(props) {
  //   super(props);
  //   this.state = { cardData: { valid: false } };
  // }


  // for debugging purposes else just do: useState({valid:false})
  
  const [cardData, setCardData ] = useState({
    valid: true, // will be true once all fields are "valid" (time to enable the submit button)
    values: { // will be in the sanitized and formatted form
      number: "4242424242424242",
      expiry: "02/22",
      cvc: "222",
      type: "visa", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
      name: "Sam",
      postalCode: "34567",
      }
    });



  // for debugggin purposes


  return (
    <SafeAreaView>
      <View>
        <CreditCardInput 
            requiresName
            onChange={(cardData) => setCardData({ cardData })} 
            />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          color='purple'
          title='Add This Card'
          disabled={false}
          onPress={() => onSubmit(cardData)}
        />
        {/* Show errors */}
        {error && (
          <View style={styles.alertWrapper}>
            <View style={styles.alertIconWrapper}>
              <FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} />
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
    alignItems: 'center'
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});



export default PaymentFormView;