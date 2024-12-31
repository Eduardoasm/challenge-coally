"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTaskId = exports.validateTask = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware
exports.validateTask = [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .trim()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Title must be between 3 and 50 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage('Description cannot exceed 150 characters'),
    (0, express_validator_1.body)('completed')
        .optional()
        .isIn([true, false])
        .withMessage('Status must be either true or false'),
];
exports.validateTaskId = [
    (0, express_validator_1.param)('id').isString().withMessage('Invalid task ID'),
];
