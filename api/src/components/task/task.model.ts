import { Document, model, Schema, Types } from 'mongoose';
import { ITask } from './task.dto';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

const taskSchema = new Schema<ITask>(
  {
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
  },
  { 
    timestamps: true,
  }
);

// Add methods
taskSchema.methods.markAsComplete = async function() {
  this.completed = true;
  await this.save();
};

taskSchema.methods.markAsIncomplete = async function() {
  this.completed = false;
  await this.save();
};

// Pre-save middleware
taskSchema.pre('save', function(next) {
  // Trim strings
  if (this.title) this.title = this.title.trim();
  if (this.description) this.description = this.description.trim();
  
  next();
});

export const Task = model<ITask>('Task', taskSchema);
// export const TaskTC = composeMongoose(Task);
