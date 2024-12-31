import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
} from 'mongoose';
import { IUser } from './user.dto';
import { User } from './user.model';

async function findOne(
  filter: FilterQuery<IUser> = {},
  projection?: ProjectionType<IUser> | null,
  options?: QueryOptions<IUser> | null
) {
  const user = await User.findOne(filter, projection, options).exec();
  if (!user) {
    throw new Error('User not found')
  }
  return user;
}

async function find(
  filter: FilterQuery<IUser> = {},
  projection?: ProjectionType<IUser> | null,
  options?: QueryOptions<IUser> | null
) {
  return User.find(filter, projection, options).exec();
}

async function updateOne({
  _id, data
}: {
  _id: IUser['_id'], data: Partial<IUser>
}): Promise<{ message: string }> {
  await findOne({ _id });

  await User.updateOne({ _id }, data)

  return {
    message: 'User updated successfully'
  }
}

async function deleteById(userId: string): Promise<{ message: string}> {
  await findOne( { _id: userId });
  await User.deleteOne({ _id: userId }).exec();
  return {
    message: 'User deleted successfully'
  }
}

async function create(user: IUser) {
  return new User(user).save();
}

export const userService = Object.freeze({
  findOne,
  find,
  updateOne,
  deleteById,
  create,
})
