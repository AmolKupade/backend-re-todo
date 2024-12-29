const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a new Todo
router.post('/', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a Todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
