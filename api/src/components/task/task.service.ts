import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
} from 'mongoose';
import { ITask } from './task.dto';
import { Task } from './task.model';

async function findOne(
  filter: FilterQuery<ITask> = {},
  projection?: ProjectionType<ITask> | null,
  options?: QueryOptions<ITask> | null
) {
  const task = await Task.findOne(filter, projection, options).exec();
  if (!task) {
    throw new Error('Task not found')
  }
  return task;
}

async function find(
  filter: FilterQuery<ITask> = {},
  projection?: ProjectionType<ITask> | null,
  options?: QueryOptions<ITask> | null
) {
  return Task.find(filter, projection, options).exec();
}

async function updateOne({
  id, data
}: {
  id: ITask['_id'], data: Partial<ITask>
}): Promise<{ message: string }> {
  await findOne({ _id: id });

  await Task.updateOne({ _id: id }, data)

  return {
    message: 'Task updated successfully'
  }
}

async function deleteById(TaskId: string): Promise<{ message: string}> {
  await findOne( { _id: TaskId });
  await Task.deleteOne({ _id: TaskId }).exec();
  return {
    message: 'Task deleted successfully'
  }
}

async function create(task: ITask) {
  return new Task(task).save();
}

export const taskService = Object.freeze({
  findOne,
  find,
  updateOne,
  deleteById,
  create,
})
