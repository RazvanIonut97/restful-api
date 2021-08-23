"use strict"
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find().sort({
			position: 1
		});
		res.json(todos);
	} catch (err) {
		res.json(err);
	}
});
router.post("/", async (req, res) => {
	const todo = new Todo({
		title: req.body.title
	});
	//Updates the position of the other existing items starting from  2  
	try {
		const todos = await Todo.find().sort({
			position: 1
		});
		let num = 2;
		todos.forEach(async todo => {
			await Todo.updateOne({
				_id: todo._id
			}, {
				$set: {
					position: num++
				}
			});
		});
	} catch (err) {
		res.json({
			message: err
		})
	}
	//Adding the new item
	try {
		await todo.save()
			.then(data => {
				res.json(todo);
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
		const test = await Todo.findById(req.params.todoId);
		let num = test.position;
		const todos = await Todo.find({
			"position": {
				"$gt": num
			}
		}).sort({
			position: 1
		});
		todos.forEach(async todo => {

			await Todo.updateOne({
				_id: todo._id
			}, {
				$set: {
					position: num++
				}
			});
		})
	} catch (err) {
		res.json({
			message: err
		})
	}
	try {
		const removedTodo = await Todo.deleteOne({
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
	const selector = req.body.selector;
	try {
		if (selector==1) {
			const oldPosition = req.body.oldPosition;
			const newPosition = req.body.newPosition;

			if (newPosition < oldPosition) {
				const todos = await Todo.find({
						position: {
							$gte: newPosition,
							$lt: oldPosition
						}
					})
					.sort({
						position: 1
					});
				todos.forEach(async todo => {
					await Todo.updateOne({
						_id: todo._id
					}, {
						$set: {
							position: todo.position + 1
						}
					});
				});

				const updatedTodo = await Todo.updateOne({
					_id: req.params.todoId
				}, {
					$set: {
						position: newPosition
					}
				});
				res.json(updatedTodo);
			}
			if (newPosition >= oldPosition) {
				const todos = await Todo.find({
						position: {
							$gt: oldPosition,
							$lte: newPosition
						}
					})
					.sort({
						position: 1
					});
				todos.forEach(async todo => {
					await Todo.updateOne({
						_id: todo._id
					}, {
						$set: {
							position: todo.position - 1
						}
					});
				});


				const updatedTodo = await Todo.updateOne({
					_id: req.params.todoId
				}, {
					$set: {
						position: newPosition
					}
				});
				res.json(updatedTodo);
			}
		}
        else if(selector==0){
            const updatedTodo = await Todo.updateOne({
                _id: req.params.todoId
            }, {
                $set: {
                    isDone: req.body.isDone
                }
            });
            res.json(updatedTodo);
        }

	} catch (err) {
		res.json({
			message: err
		})
	}
});
module.exports = router;