const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User.js');

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/admin/users', async (req, res) => {
    try {
      const users = await User.find().sort({ create_time: -1 });
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



// @route    POST api/users
// @desc     Create a new User
// @access   Public
router.post(
  '/users',
  [
    check('nickname', 'Nickname is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('status'  , 'Status is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nickname, username, password, status } = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        nickname,
        username,
        password,
        status
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json('User created successfully');

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;