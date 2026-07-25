const Stripe = require('stripe');

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const createPaymentIntent = async ({ amount, currency = 'usd', metadata = {} }) => {
  if (!stripe) {
    return {
      id: 'mock_payment_intent',
      client_secret: 'mock_client_secret',
      amount,
      currency,
      metadata
    };
  }

  return stripe.paymentIntents.create({ amount, currency, metadata });
};

module.exports = { createPaymentIntent };
