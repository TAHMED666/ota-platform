const express = require('express');
const { getMyBookings } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authenticate, getMyBookings);

module.exports = router;
