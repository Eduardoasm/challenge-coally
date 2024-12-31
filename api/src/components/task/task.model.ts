import { model, Schema } from 'mongoose';
import { ITask } from './task.dto';

const taskSchema = new Schema<ITask>(
  {
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
  },
  { 
    timestamps: true,
  }
);

// Pre-save middleware
taskSchema.pre('save', function(next) {
  if (this.title) this.title = this.title.trim();
  if (this.description) this.description = this.description.trim();
  
  next();
});

export const Task = model<ITask>('Task', taskSchema);
