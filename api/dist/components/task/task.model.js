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
exports.Task = exports.TaskPriority = void 0;
const mongoose_1 = require("mongoose");
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "low";
    TaskPriority["MEDIUM"] = "medium";
    TaskPriority["HIGH"] = "high";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false,
        index: true // Index for filtering completed/incomplete tasks
    },
    // dueDate: {
    //   type: Date,
    //   required: false,
    //   index: true // Index for sorting by due date
    // },
    // priority: {
    //   type: String,
    //   enum: Object.values(TaskPriority),
    //   default: TaskPriority.MEDIUM,
    //   index: true
    // },
    // tags: [{
    //   type: String,
    //   trim: true
    // }]
}, {
    timestamps: true,
});
// Add methods
taskSchema.methods.markAsComplete = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.completed = true;
        yield this.save();
    });
};
taskSchema.methods.markAsIncomplete = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.completed = false;
        yield this.save();
    });
};
// Pre-save middleware
taskSchema.pre('save', function (next) {
    // Trim strings
    if (this.title)
        this.title = this.title.trim();
    if (this.description)
        this.description = this.description.trim();
    next();
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
// export const TaskTC = composeMongoose(Task);
