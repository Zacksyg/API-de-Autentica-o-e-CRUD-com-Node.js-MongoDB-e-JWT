const Todo = require('../models/todo.model');

const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const owner = req.user.id; 
    const newTodo = await Todo.create({ title, owner });

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ owner: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    if (todo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { title, done } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    if (todo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    todo.title = title ?? todo.title;
    todo.done = done ?? todo.done;

    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    if (todo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    await todo.deleteOne();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};