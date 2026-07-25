const express = require('express');
const { body } = require('express-validator');
const { searchHotels, bookHotel } = require('../controllers/hotelController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.get('/search', searchHotels);
router.post(
  '/book',
  authenticate,
  [
    body('hotelId').isUUID(),
    body('checkInDate').isISO8601(),
    body('checkOutDate').isISO8601(),
    body('rooms').optional().isInt({ min: 1 })
  ],
  validateRequest,
  bookHotel
);

module.exports = router;
