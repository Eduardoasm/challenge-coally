"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
function notFoundHandler(req, res, next) {
    const error = new Error(`${req.method} ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
}
function errorHandler(error, req, res, next) {
    error['status'] = error['status'] || 500;
    res.status(error.status).json({
        success: false,
        message: error.message,
    });
}
