import React, {useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AddSubscriptionView from '../payment-components/AddSubscriptionView';
import { set } from 'react-native-reanimated';

import PaymentFormView from '../payment-components/PaymentFormView'

function Payments({ navivation }) {

  const STRIPE_ERROR = 'Payment service error. Try again later.';
  const SERVER_ERROR = 'Server error. Try again later.';
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51HItyfDvkcqrDENweFl6pp4wg2manVXHTMvzdrFsJumzdHAciT1WFAydcgz7Vr1BudQoRRYp5UEU2qQEdteB5BcJ00KWgK3BP2';

  // fake our db call
  const subscribeUser = (creditCardToken) => {


    console.warn('we welcome this creditCardToken into our database as our God')

    return new Promise((resolve) => {
      console.log('Credit card token\n', creditCardToken);
      setTimeout(() => {
        resolve({ status: true });
      }, 1000)
    });
  };

  function talkToStripe(creditCardData) {
    const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc
    };
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

    // success lets persist this card with our token.
    // talk to our demo server
    const { error } = await subscribeUser(creditCardToken);



    if(error) {
      setSubmitted(false);
      setError(SERVER_ERROR);
    } else {
      setSubmitted(false);
      setError(null);
      // navigation.navigate somewhere ... maybe back?
    }
  }
  
  return (
    <SafeAreaView>
      <PaymentFormView
        error={error}
        submitted={submitted}
        onSubmit={handleSubmit}
      />
      <Text style={{padding:10}}>Current Card on File:</Text>
    </SafeAreaView>
  );
}

export default Payments;