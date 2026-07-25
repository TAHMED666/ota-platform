const { Payment } = require('../models');
const { createPaymentIntent } = require('../services/stripeService');

const checkout = async (req, res, next) => {
  try {
    const { bookingType, bookingId, amount, currency = 'usd' } = req.body;

    const intent = await createPaymentIntent({
      amount: Math.round(Number(amount) * 100),
      currency,
      metadata: { userId: req.user.id, bookingType, bookingId }
    });

    const payment = await Payment.create({
      userId: req.user.id,
      bookingType,
      bookingId,
      stripePaymentIntentId: intent.id,
      amount,
      currency: currency.toUpperCase(),
      status: 'pending'
    });

    return res.status(201).json({ payment, clientSecret: intent.client_secret });
  } catch (error) {
    return next(error);
  }
};

module.exports = { checkout };
