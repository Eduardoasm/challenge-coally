"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTaskId = exports.validateTask = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware
exports.validateTask = [
    (0, express_validator_1.body)('title').notEmpty().trim().withMessage('Title is required'),
    (0, express_validator_1.body)('description').optional().trim(),
    (0, express_validator_1.body)('completed')
        .optional()
        .isIn([true, false])
        .withMessage('Status must be either true or false'),
];
exports.validateTaskId = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Invalid task ID'),
];
