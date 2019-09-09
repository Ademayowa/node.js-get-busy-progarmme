const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// User model
const User = require('../models/User');
// Sign-up validation
const validateSignUpInput = require('../validation/sign-up');
// Sign-in validation
const validateSignInInput = require('../validation/sign-in');

/**
 * @description  Signup user
 * @route  POST api/v1/auth/sign-up
 * @returns {Object} status, message and token
 * @access public
 */
exports.signUp = async (req, res) => {
  const { isValid, errors } = validateSignUpInput(req.body);

  try {
    // Check user input validation
    if (!isValid) return res.status(400).json(errors);

    const { name, email, password } = req.body;

    // Check if email already exist
    let user = await User.findOne({ email });
    if (user) {
      errors.email = 'Email already exist';
      return res.status(409).json(errors);
    }

    // create new user
    user = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    // Save user
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1hr' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          status: 'success',
          msg: 'Sign up successfully',
          token: token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
  }
};

/**
 * @description  Signin user
 * @route  POST api/v1/auth/sign-in
 * @returns {Object} status, message & token
 * @access public
 */
exports.signIn = async (req, res) => {
  const { isValid, errors } = validateSignInInput(req.body);
  // Check validation
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  try {
    // Find user by an existing email
    let user = await User.findOne({ email });
    if (!user) {
      errors.email = 'Invalid credentials!';
      return res.status(400).json(errors);
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.password = 'Email or password not correct';
      return res.status(400).json(errors);
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1hr' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          status: 'success',
          msg: 'Sign in successfully',
          token: token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
  }
};

/**
 * @description  Get current user
 * @route  GET api/v1/auth/current
 * @returns {Object} status, message & authenticated user data
 * @access private
 */
exports.getCurrentUser = (req, res) => {
  res.json({
    status: 'success',
    msg: 'User authenticated',
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};
