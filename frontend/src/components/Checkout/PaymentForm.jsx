import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { server } from '../../server';

// ToDo: Change here with pk_test
const stripePromise = loadStripe('pk_test_51O8w6CBaHuGFAIvcmSmaM1JEhALeGVcOHVdtJGFGdDGpAIEPveWbhAtgZEPNILJLXcYMfPDe3gJ4hMM65O9WwfDa00f4nlWxGk');

const PaymentForm = ({ orderId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payment intent on the server
      const { data } = await axios.post(`${server}/payment/create-payment-intent`, {
        orderId,
        amount,
        currency: 'usd',
      });

      const { clientSecret } = data;

      // Confirm the payment
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        // Update the order in the backend
        await axios.post(`${server}/payment/confirm-payment`, {
          paymentIntentId: paymentIntent.id,
          orderId,
        });

        alert('Payment successful! Order updated.');

        // Call the onSuccess function to close the modal and refresh the page
        onSuccess();
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-4">
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

const StripeContainer = ({ orderId, amount, onSuccess }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm orderId={orderId} amount={amount} onSuccess={onSuccess} />
  </Elements>
);

export default StripeContainer;

