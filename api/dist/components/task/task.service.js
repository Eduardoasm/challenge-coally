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
exports.taskService = void 0;
const task_model_1 = require("./task.model");
function findOne() {
    return __awaiter(this, arguments, void 0, function* (filter = {}, projection, options) {
        const task = yield task_model_1.Task.findOne(filter, projection, options).exec();
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    });
}
function find() {
    return __awaiter(this, arguments, void 0, function* (filter = {}, projection, options) {
        return task_model_1.Task.find(filter, projection, options).exec();
    });
}
function updateOne(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, data }) {
        yield findOne({ _id: id });
        yield task_model_1.Task.updateOne({ _id: id }, data);
        return {
            message: 'Task updated successfully'
        };
    });
}
function deleteById(TaskId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield findOne({ _id: TaskId });
        yield task_model_1.Task.deleteOne({ _id: TaskId }).exec();
        return {
            message: 'Task deleted successfully'
        };
    });
}
function create(task) {
    return __awaiter(this, void 0, void 0, function* () {
        return new task_model_1.Task(task).save();
    });
}
exports.taskService = Object.freeze({
    findOne,
    find,
    updateOne,
    deleteById,
    create,
});
