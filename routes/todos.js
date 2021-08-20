"use strict"
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.json(err);
    }
});
router.post("/", (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });
    try {
    todo.save()
        .then(data => {
            res.json(data);
        })
    }catch (err) {
            res.json(err);
        }
});
router.get('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);
        res.json(todo);
    } catch (err) {
        res.json({
            message: err
        })
    }
});
router.delete('/:todoId', async (req, res) => {
    try {
        const removedTodo = await Todo.remove({
            _id: req.params.todoId
        });
        res.json(removedTodo);

    } catch (err) {
        res.json({
            message: err
        })
    }
});
router.patch('/:todoId', async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne({
            _id: req.params.todoId
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.json(updatedTodo);
        console.log('da')

    } catch (err) {
        res.json({
            message: err
        })
    }
});
module.exports = router;