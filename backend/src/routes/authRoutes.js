const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/register',
  [body('name').trim().notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validateRequest,
  register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validateRequest, login);

module.exports = router;
