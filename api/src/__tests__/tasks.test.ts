import mongoose from 'mongoose';
import { taskService } from '../components/task/task.service';
import { Task } from '../components/task/task.model';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { describe, afterAll, beforeEach, it, expect, beforeAll } from '@jest/globals';

describe('Task Service', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  const mockTask = {
    title: 'Test Task',
    description: 'Test Description',
    completed: false
  };

  describe('create', () => {
    it('create a new task', async () => {
      const task = await taskService.create(mockTask);
      expect(task.title).toBe(mockTask.title);
      expect(task.description).toBe(mockTask.description);
      expect(task.completed).toBe(false);
    });

    it('throw error if title is missing', async () => {
      const invalidTask = { description: 'Test' };
      await expect(taskService.create(invalidTask as any)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('find task by id', async () => {
      const created = await taskService.create(mockTask);
      const found = await taskService.findOne({ _id: created._id });
      expect(found.title).toBe(mockTask.title);
    });

    it('throw error if task not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await expect(taskService.findOne({ _id: fakeId })).rejects.toThrow('Task not found');
    });
  });

  describe('find', () => {
    it('find all tasks', async () => {
      await taskService.create(mockTask);
      await taskService.create({ ...mockTask, title: 'Second Task' });
      
      const tasks = await taskService.find();
      expect(tasks).toHaveLength(2);
    });

    it('filter tasks by completed status', async () => {
      await taskService.create(mockTask);
      await taskService.create({ ...mockTask, completed: true });
      
      const completedTasks = await taskService.find({ completed: true });
      expect(completedTasks).toHaveLength(1);
    });
  });

  describe('updateOne', () => {
    it('update task', async () => {
      const task = await taskService.create(mockTask);
      const update = { title: 'Updated Title' };
      
      await taskService.updateOne({ id: task._id, data: update });
      const updated = await taskService.findOne({ _id: task._id });
      
      expect(updated.title).toBe('Updated Title');
    });

    it('throw error if task to update not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await expect(
        taskService.updateOne({ id: fakeId, data: { title: 'New' } })
      ).rejects.toThrow('Task not found');
    });
  });

  describe('deleteById', () => {
    it('delete task', async () => {
      const task = await taskService.create(mockTask);
      await taskService.deleteById(task._id);
      
      await expect(
        taskService.findOne({ _id: task._id })
      ).rejects.toThrow('Task not found');
    });

    it('throw error if task to delete not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await expect(
        taskService.deleteById(fakeId as any)
      ).rejects.toThrow('Task not found');
    });
  });
});
