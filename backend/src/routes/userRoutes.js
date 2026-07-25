const express = require('express');
const { getProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { apiRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.get('/profile', apiRateLimiter, authenticate, getProfile);

module.exports = router;
