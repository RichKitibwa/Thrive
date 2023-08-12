const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticateUser = require('../middlewares/authMiddleware');
const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

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
  
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: savedUser._id }, secretKey, { expiresIn: '10h' });

      res.json({ token, user: {username: savedUser.username, email: savedUser.email} });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register a new user.' });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: '10h'});
      res.json({ token, user: {username: user.username, email: user.email} });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in.' });
    }
});

router.get('/user', authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ username: user.username, email: user.email, imageUrl: user.imageUrl, isGoogleSignUp: user.isGoogleSignUp });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user information.' });
  }
});

router.post('/google-signup', async (req, res) => {
  try {

    const { googleToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();

    console.log(payload);
    const { name, email, sub: googleId, picture } = payload;
    let user = await User.findOne({ googleId });
    
    if (!user) {
      const hashedPassword = googleToken
      user = new User({
        username: name,
        email,
        googleId,
        password: hashedPassword,
        isGoogleSignUp: true,
        imageUrl: picture,
      });

      await user.save();
    }

    const secretKey = process.env.JWT_SECRET;
    const appToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '10h' });

    res.json({ token: appToken, user: { username: user.username, email: user.email, imageUrl: user.imageUrl } });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to signup with google"});
  }
});
  
module.exports = router;
