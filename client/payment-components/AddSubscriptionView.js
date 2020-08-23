
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
/**
 * The class renders a view with PaymentFormView
 */
function AddSubscriptionView ({error, submitted, onSubmit}) {

  // removed this from
  // ref={ref => (this.scrollViewRef = ref)}

  // 

  // <PaymentFormView
  // error={error}
  // submitted={submitted}
  // onSubmit={onSubmit}
  // />

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>
            Try out full Stripe payment functionality in a React Native app
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>
            Subscribe to see the magic number!
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>
            Subscription Plan: $10/month
          </Text>
        </View>
        <View style={styles.cardFormWrapper}>
          <Text> Heydude</Text>

        </View>
      </ScrollView>
      {/* Scrolls to the payment form */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center'
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});

export default AddSubscriptionView;
