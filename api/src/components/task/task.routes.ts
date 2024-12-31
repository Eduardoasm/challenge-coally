import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from './task.controller';
import { validateTask, validateTaskId } from './task.validators';

const taskRouter = Router();

// CRUDS
taskRouter.post('/', validateTask, createTask);
taskRouter.get('/', getTasks);
taskRouter.get('/:id', validateTaskId, getTask);
taskRouter.put('/:id', validateTask, validateTaskId, updateTask);
taskRouter.delete('/:id', validateTaskId, deleteTask);

export default taskRouter;

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
