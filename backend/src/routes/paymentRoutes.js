const express = require('express');
const { body } = require('express-validator');
const { checkout } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/checkout',
  authenticate,
  [body('bookingType').isIn(['flight', 'hotel']), body('bookingId').isUUID(), body('amount').isFloat({ gt: 0 })],
  validateRequest,
  checkout
);

module.exports = router;
