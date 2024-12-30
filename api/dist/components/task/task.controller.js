"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = getTask;
exports.getTasks = getTasks;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const task_service_1 = require("./task.service");
const express_validator_1 = require("express-validator");
function getTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const task = yield task_service_1.taskService.findOne({ filter: Object.assign(Object.assign({}, req.body), { id }) });
            return res.status(200).json({ success: true, data: task });
        }
        catch (error) {
            next(error);
        }
    });
}
function getTasks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const task = yield task_service_1.taskService.find(req.body);
            return res.status(200).json({ success: true, data: task });
        }
        catch (error) {
            next(error);
        }
    });
}
function createTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const task = yield task_service_1.taskService.create(req.body);
            return res.status(200).json({ success: true, data: task });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const task = yield task_service_1.taskService.updateOne({ id, data: req.body });
            return res.status(200).json({ success: true, data: task });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const task = yield task_service_1.taskService.deleteById(id);
            return res.status(200).json({ success: true, data: task });
        }
        catch (error) {
            next(error);
        }
    });
}
