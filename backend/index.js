require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./db/connection');
const Task = require('./models/task');
const User = require('./models/user');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

connectDatabase();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/tasks', taskRoutes);

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}.`);
});
