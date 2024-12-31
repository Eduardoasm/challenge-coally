"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
const task_validators_1 = require("./task.validators");
const authenticate_1 = require("../../middlewares/authenticate");
const taskRouter = (0, express_1.Router)();
// CRUDS
taskRouter.post('/', authenticate_1.authenticate, task_validators_1.validateTask, task_controller_1.createTask);
taskRouter.get('/', authenticate_1.authenticate, task_controller_1.getTasks);
taskRouter.get('/:id', authenticate_1.authenticate, task_validators_1.validateTaskId, task_controller_1.getTask);
taskRouter.put('/:id', authenticate_1.authenticate, task_validators_1.validateTask, task_validators_1.validateTaskId, task_controller_1.updateTask);
taskRouter.delete('/:id', authenticate_1.authenticate, task_validators_1.validateTaskId, task_controller_1.deleteTask);
exports.default = taskRouter;
/**
 * @openapi
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project"
 *               description:
 *                 type: string
 *                 example: "Finish the API documentation"
 *               completed:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *
 * /api/tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *
 *       404:
 *         description: Task not found
 *
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Update task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
