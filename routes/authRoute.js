const express = require('express');
const router = express.Router();
const config = require('config');

// Auth controller
const {
  signUp,
  signIn,
  getCurrentUser
} = require('../controllers/authController');

// Middleware
const auth = require('../middleware/auth');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/current', auth, getCurrentUser);

module.exports = router;
