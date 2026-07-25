const express = require('express');
const { body } = require('express-validator');
const { searchFlights, bookFlight } = require('../controllers/flightController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.get('/search', searchFlights);
router.post(
  '/book',
  authenticate,
  [body('flightId').isUUID(), body('passengers').optional().isInt({ min: 1 })],
  validateRequest,
  bookFlight
);

module.exports = router;
