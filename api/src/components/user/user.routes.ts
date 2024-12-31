import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './user.controller';
import { validateUpdateUser, validateUser, validateUserId } from './user.validators';

const userRouter = Router();

// CRUDS
userRouter.post('/', validateUser, createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', validateUserId, getUser);
userRouter.put('/:id', validateUserId, updateUser);
userRouter.delete('/:id', validateUpdateUser, validateUserId, deleteUser);

export default userRouter;
