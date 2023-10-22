const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/middleware');
const todoController = require('../controllers/todoController');

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       '200':
 *         description: A list of todos
 */
router.get('/', isAuth, todoController.getAllTodos);

/**
 * @swagger
 * /todos/all:
 *   get:
 *     summary: Get all todos including deleted ones
 *     tags: [Todos]
 *     responses:
 *       '200':
 *         description: A list of todos including deleted ones
 */
router.get('/all', isAuth, todoController.getAllTodosIncludingDeleted);

/**
 * @swagger
 * /todos/deleted:
 *   get:
 *     summary: Get deleted todos
 *     tags: [Todos]
 *     responses:
 *       '200':
 *         description: A list of deleted todos
 */
router.get('/deleted', isAuth, todoController.getDeletedTodos);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Todo created successfully
 */
router.post('/', isAuth, todoController.addTodo);

/**
 * @swagger
 * /todos/statuses:
 *   get:
 *     summary: Get all todo statuses
 *     tags: [Todos]
 *     responses:
 *       '200':
 *         description: A list of todo statuses
 */
router.get('/statuses', todoController.getStatuses);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to update
 *     responses:
 *       '200':
 *         description: Updated todo details
 */
router.put('/:id', isAuth, todoController.updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *     responses:
 *       '200':
 *         description: Todo deleted successfully
 */
router.delete('/:id', isAuth, todoController.deleteTodo);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to retrieve
 *     responses:
 *       '200':
 *         description: A single todo
 */

router.get('/statuses', todoController.getStatuses);
router.get('/all', isAuth, todoController.getAllTodosIncludingDeleted);
router.get('/deleted', isAuth, todoController.getDeletedTodos);

router.get('/:id', isAuth, todoController.getTodo);
router.put('/:id', isAuth, todoController.updateTodo);
router.delete('/:id', isAuth, todoController.deleteTodo);

router.get('/', isAuth, todoController.getAllTodos);
router.post('/', isAuth, todoController.addTodo);

module.exports = router;


