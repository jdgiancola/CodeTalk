const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Add session saving logic here

    res.status(200).json({ user: user, message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User logout route
router.post('/logout', (req, res) => {
  // Add session destroying logic here
  res.status(200).json({ message: 'You are now logged out!' });
});

module.exports = router;
