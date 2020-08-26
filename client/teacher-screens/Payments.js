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
  const STRIPE_LIVE_PUBLISHABLE_KEY =
    'pk_test_51HItyfDvkcqrDENwJrLb0fPGcBCihcsOnadf2mVsq5efTj31ALTvBoQNzN663U2oLOoDau1nkEMKJpMttRD1jT3E00LyKFTHQU';

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
        console.warn(creditCardToken.error);
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
    <ImageBackground
      resizeMode={'cover'} // or cover
      style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
      source={require('../assets/images/payment.jpg')}
    >
      <SafeAreaView style={stylesheet.wholeScreen}>
        <AddCCScreen
          error={error}
          submitted={submitted}
          onSubmit={handleSubmit}
        />
        <Text style={stylesheet.title}>Current Card on File:</Text>
        <Text style={{ padding: 10, backgroundColor: 'rgba(206,212,211,0.3)' }}>
          XXXX XXXX XXXX {viewLastFour}
        </Text>

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
    </ImageBackground>
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
  },
  title: {
    padding: 10,
    fontSize: 15,
    // color: 'white',
    fontWeight: 'bold',
    // alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(206,212,211,0.5)',
    alignSelf: 'center',
    width: 300,
    padding: 20,
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'AvenirLTStdBook',
    fontSize: 22,
    // fontWeight: 'bold',
  },
});

export default Payments;
