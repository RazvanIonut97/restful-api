"use strict"
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({position:1});
        res.json(todos);
    } catch (err) {
        res.json(err);
    }
});
router.post("/", async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        position: 1
    });
    //Updates the position of the other existing items starting from  2    
    const todos = await Todo.find().sort({position:1});
    let num = 2;
    todos.forEach(async todo => {
        try {
            await Todo.updateOne({
                _id: todo._id
            }, {
                $set: {
                    position: num++
                }
            });
        } catch (err) {
            res.json({
                message: err
            })
        }
    });
    //Adding the new item
    try {
        await todo.save()
            .then(data => {
                res.json(data);
            })
    } catch (err) {
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
                description: req.body.description,
                position: req.body.position
            }
        });
        res.json(updatedTodo);

    } catch (err) {
        res.json({
            message: err
        })
    }
});
module.exports = router;