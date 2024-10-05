const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Payment = require("../model/payment");
const Order = require("../model/order");

// sk_test ......
// ToDo: change here with sk_test
const stripe = require("stripe")("sk_test_51O8w6CBaHuGFAIvc8Am4yG0x1BEvpdjmfYKkd5OgJFeUrh4peiorW5rPRwbS8l3gdBRxBQHsJWNIWEAVqNj5I5gd00m1C2JaRC");

router.post('/create-payment-intent', async (req, res) => {
  try {
    console.log("stripe: ", process.env.STRIPE_SECRET_KEY);
    const { orderId, amount, currency } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount.replace("US$ ", "")) * 100,
      currency: currency,
      payment_method_types: ['card'],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

// Handle Payment Confirmation and Order Update
router.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  try {
    // Confirm the payment with the payment intent ID
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {

      const order = await Order.findById(orderId)

      // Create a new payment record in the database
      const payment = new Payment({
        orderId: order._id,
        seller: order.seller,
        traveler: order.traveler,
        amount: order.deliveryFee,
        paymentStatus: 'completed',
        orderStatus: 'in-transit',
        stripePaymentId: paymentIntentId,
        paymentMethod: 'card',
      });

      await payment.save();

      // Update order status to paid in the database
      await Order.findByIdAndUpdate(orderId, { paymentStatus: 'completed' });

      res.status(200).json({ message: 'Payment successful, order updated' });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Payment confirmation failed' });
  }
});

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_PUBLIC_KEY });
  })
);

module.exports = router;