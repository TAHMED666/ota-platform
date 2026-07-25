const express = require('express');
const { getMyBookings } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');
const { apiRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.get('/me', apiRateLimiter, authenticate, getMyBookings);

module.exports = router;
