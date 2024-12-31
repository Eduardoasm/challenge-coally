import { body, param } from 'express-validator';

// Validation middleware
export const validateUser = [
  body('email')
    .notEmpty()
    .trim()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
  .optional()
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('First name must be between 3 and 15 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('Last name must be between 3 and 15 characters'),
];

export const validateUserId = [
  param('id').isString().withMessage('Invalid user ID'),
];

export const validateUpdateUser = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('First name must be between 3 and 15 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage('Last name must be between 3 and 15 characters'),
]