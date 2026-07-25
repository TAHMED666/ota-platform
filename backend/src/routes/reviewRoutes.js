const express = require('express');
const { body } = require('express-validator');
const { createReview, listReviews } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', listReviews);
router.post(
  '/',
  authenticate,
  [
    body('entityType').isIn(['flight', 'hotel']),
    body('entityId').isUUID(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().isString()
  ],
  validateRequest,
  createReview
);

module.exports = router;
