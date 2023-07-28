const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register a new user.' });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: '10h'});
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in.' });
    }
});
  
module.exports = router;
