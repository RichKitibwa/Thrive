const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  isCompleted: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
