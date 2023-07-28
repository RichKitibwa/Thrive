const mongoose = require('mongoose');

const databaseURL = 'mongodb://127.0.0.1:27017/thrive';

const connectDatabase = async () => {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDatabase;
