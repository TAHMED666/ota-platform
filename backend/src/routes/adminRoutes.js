const express = require('express');
const { getDashboard } = require('../controllers/adminController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', authenticate, authorizeAdmin, getDashboard);

module.exports = router;
