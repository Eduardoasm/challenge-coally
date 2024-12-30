import { body, param } from 'express-validator';

// Validation middleware
export const validateTask = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').optional().trim(),
  body('completed')
    .optional()
    .isIn([true, false])
    .withMessage('Status must be either true or false'),
];

export const validateTaskId = [
  param('id').isString().withMessage('Invalid task ID'),
];
