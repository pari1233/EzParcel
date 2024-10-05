import React from 'react';
import StripeContainer from './PaymentForm';

const Checkout = ({ orderId, amount }) => {
  return (
    <div>
      <h1>Checkout</h1>
      <StripeContainer orderId={orderId} amount={amount} />
    </div>
  );
};

export default Checkout;
