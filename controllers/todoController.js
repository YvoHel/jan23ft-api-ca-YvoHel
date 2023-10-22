const db = require('../models');
const Todo = db.Todo;
const Status = db.Status;

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: {
                userId: req.user.id,
                StatusId: { [db.Sequelize.Op.ne]: 'deleted' } // Assuming 'deleted' is an actual ID. If it's a name, adjust accordingly.
            },
            include: [db.Category, db.Status],
        });
        res.status(200).json({ status: 'success', data: todos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getAllTodosIncludingDeleted = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            include: [db.Category, db.Status],
            where: { userId: req.user.id }
        });
        res.status(200).json({ status: 'success', data: todos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getDeletedTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            include: [db.Category, db.Status],
            where: { userId: req.user.id, StatusId: 'deleted' }
        });
        res.status(200).json({ status: 'success', data: todos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.addTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json({ status: 'success', data: todo });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getStatuses = async (req, res) => {
    try {
        const statuses = await Status.findAll();
        res.status(200).json({ status: 'success', data: statuses });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const affectedRows = await Todo.update(req.body, {
            where: { id: req.params.id, userId: req.user.id }
        });
        
        if (affectedRows[0] === 0) {
            return res.status(404).json({ status: 'error', message: 'Todo not found.' });
        }

        const updatedTodo = await Todo.findByPk(req.params.id);
        res.status(200).json({ status: 'success', data: updatedTodo });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.update({ StatusId: 'deleted' }, {
            where: { id: req.params.id, userId: req.user.id }
        });
        res.status(204).json(); // 204 No Content for a successful operation with no content returned.
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
