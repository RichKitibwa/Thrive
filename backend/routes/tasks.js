const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authenticateUser = require('../middlewares/authMiddleware');

router.post('/task', authenticateUser, async (req, res) => {
    try {
      const ownerId = req.user.userId;
      const { name, description, dueDate, isCompleted, owner } = req.body;
      const newTask = new Task({
        name,
        description,
        dueDate,
        isCompleted,
        owner: ownerId,
      });
      const savedTask = await newTask.save();
      res.json(savedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new task.' });
    }
});

router.get('/tasks', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

router.get('/:id', authenticateUser, async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the task.' });
    }
});

router.put('/:id', authenticateUser, async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found.' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the task.' });
    }
});

router.delete('/:id', authenticateUser, async (req, res) => {
    try {
      const taskId = req.params.id;
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found.' });
      }
      res.json(deletedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the task.' });
    }
});

module.exports = router;
