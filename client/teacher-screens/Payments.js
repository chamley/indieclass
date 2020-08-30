import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import AddCCScreen from '../payment-components/AddCCScreen';
import { STRIPE_LIVE_PUBLISHABLE_KEY } from './../env'
import LottieView from 'lottie-react-native';

import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentDB } from '../store/actions';
import { useSafeArea } from 'react-native-safe-area-context';

function Payments({ navivation }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { user } = data;

  const STRIPE_ERROR = 'Payment Method Not Valid.';
  const SERVER_ERROR =
    'Our servers are taking a break. Please try again later.';

  const [viewLastFour, setViewLastFour] = useState(user.lastfour);
  const [checkmark, setCheckmark] = useState(false);

  // redux magic
  const addPayment = (creditCardToken, lastfour) => {
    updatePaymentDB(user.token, creditCardToken, lastfour)(dispatch);
  };

  function talkToStripe(creditCardData) {
    // parses creditcard object
    const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc,
    };
    //get token from stripe, body is a bit hackey but its how stripe wants the inputs
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${STRIPE_LIVE_PUBLISHABLE_KEY}`,
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map((key) => key + '=' + card[key])
        .join('&'),
    }).then((response) => response.json());
  }

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(creditCardInput) {
    setSubmitted(true);
    let creditCardToken;
    // talk to stripe
    try {
      creditCardToken = await talkToStripe(creditCardInput);
      if (creditCardToken.error) {
        setSubmitted(false);
        // console.warn(creditCardToken.error);
        setError(STRIPE_ERROR);
        return;
      } else {
        /// ayyy mamasita
      }
    } catch (e) {
      setSubmitted(false);
      setError(STRIPE_ERROR);
      return;
    }
    let lastfour = creditCardInput.values.number.slice(-4);

    addPayment(creditCardToken.id, lastfour);
    setCheckmark(true);
    setViewLastFour(lastfour);
  }

  return (
    <SafeAreaView style={stylesheet.wholeScreen}>
      <AddCCScreen
        error={error}
        submitted={submitted}
        onSubmit={handleSubmit}
      />
      <View styles={stylesheet.container}>
        <Text style={stylesheet.title}>Current Card on File:</Text>
        <Text style={{ padding: 10, marginLeft: 10 }}>
          XXXX XXXX XXXX {viewLastFour}
        </Text>
      </View>
      {checkmark ? (
        <View style={stylesheet.checkmark}>
          <LottieView
            source={require('../assets/376-check-mark.json')}
            onAnimationFinish={() => setCheckmark(false)}
            style={{ height: 250, width: 250 }}
            autoPlay //loop
            loop={false}
            speed={2}
          />
          <Text>Payment Method Added!</Text>
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  checkmark: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wholeScreen: {
    paddingTop: 50,
    height: 610,
    backgroundColor: 'white',
  },
  title: {
    padding: 10,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default Payments;
