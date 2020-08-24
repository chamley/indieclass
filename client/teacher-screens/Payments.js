import React, {useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { set } from 'react-native-reanimated';

import AddCCScreen from '../payment-components/AddCCScreen'

import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../store/actions'

function Payments({ navivation }) {
  const dispatch = useDispatch();
  const data = useSelector(state=>state)
  const { user } = data;
  
  const STRIPE_ERROR = 'Payment Method Not Valid.';
  const SERVER_ERROR = 'Our servers are taking a break. Please try again later.';
  const STRIPE_LIVE_PUBLISHABLE_KEY = 'pk_live_51HItyfDvkcqrDENwYR1Xvf8Lnv7E76ETia9MU0bEPOzwaFr61BRMdJzl5FYXBYTpVvEuyl4XjxNq5KxUG43GkxeV00LGPvja2x';
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51HItyfDvkcqrDENweFl6pp4wg2manVXHTMvzdrFsJumzdHAciT1WFAydcgz7Vr1BudQoRRYp5UEU2qQEdteB5BcJ00KWgK3BP2';



  // redux magic
  const addPayment = (creditCardToken, lastfour) => {
    updatePayment(creditCardToken,user.user_id, lastfour)(dispatch);
  };

  
  function talkToStripe(creditCardData) {

    // parses creditcard object
    const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc
    };
    //get token from stripe, body is a bit hackey but its how stripe wants the inputs
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json());
  };

  const [ submitted, setSubmitted ] = useState(false);
  const [ error, setError ] = useState(null);

  async function handleSubmit(creditCardInput) {
    
    console.warn(creditCardInput)
    
    setSubmitted(true);
    let creditCardToken;
    // talk to stripe
    try {
      creditCardToken = await talkToStripe(creditCardInput);
      if(creditCardToken.error) {
        setSubmitted(false);
        console.warn(creditCardToken.error)
        setError(STRIPE_ERROR);
        return;
      }
    } catch (e) {
      setSubmitted(false);
      setError(STRIPE_ERROR);
      return;
    }


    const lastfour = creditCardData.values.number.slice(-4);
    addPayment(creditCardToken, lastfour);
    // navigation.navigate somewhere ... maybe back?

  }
  
  return (
    <SafeAreaView style= {stylesheet.wholeScreen} >
      <AddCCScreen
        error={error}
        submitted={submitted}
        onSubmit={handleSubmit}
      />
      <Text style={{ padding:10 }}>Current Card on File:</Text>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  wholeScreen: {
    backgroundColor:'#81b3df',
    paddingTop:50
  }
});

export default Payments;