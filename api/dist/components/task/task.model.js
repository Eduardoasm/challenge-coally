"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [50, 'Title cannot exceed 50 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [150, 'Description cannot exceed 150 characters']
    },
    completed: {
        type: Boolean,
        default: false,
        index: true // Index for filtering completed/incomplete tasks
    },
}, {
    timestamps: true,
});
// Pre-save middleware
taskSchema.pre('save', function (next) {
    if (this.title)
        this.title = this.title.trim();
    if (this.description)
        this.description = this.description.trim();
    next();
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
