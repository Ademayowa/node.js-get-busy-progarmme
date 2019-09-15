const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @description  Get a user
 * @route  GET somaku.com/users/1
 * @returns {Object} user data
 * @access public
 */
/**
 * @description  Get a user
 * @route  GET somaku.com/users/1
 * @returns {Object} user data
 * @access public
 */
router.get('/user', async (req, res) => {
  try {
    const user = await axios.get('http://www.somaku.com/users/1');
    const data = user.data;
    res.render('user', { data });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
