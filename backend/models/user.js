const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false, unique: true },
  isGoogleSignUp: { type: Boolean, default: false },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
