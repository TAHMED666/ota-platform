const express = require('express');
const { getDashboard } = require('../controllers/adminController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const { apiRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.get('/dashboard', apiRateLimiter, authenticate, authorizeAdmin, getDashboard);

module.exports = router;
