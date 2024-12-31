import { body, param } from 'express-validator';

// Validation middleware
export const validateTask = [
  body('title')
    .notEmpty()
    .trim()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Title must be between 3 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Description cannot exceed 150 characters'),
  body('completed')
    .optional()
    .isIn([true, false])
    .withMessage('Status must be either true or false'),
];

export const validateTaskId = [
  param('id').isString().withMessage('Invalid task ID'),
];
