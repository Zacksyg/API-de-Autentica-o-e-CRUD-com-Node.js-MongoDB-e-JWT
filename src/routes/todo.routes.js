const express = require('express');
const todoController = require('../controllers/todo.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodos);

router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;