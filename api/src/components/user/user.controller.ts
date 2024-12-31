import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { validationResult } from 'express-validator';

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task = await userService.findOne({ ...req.query, _id: id });
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task = await userService.find(req.query);
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await userService.create(req.body);
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task = await userService.updateOne({ _id: id, data: req.body });
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task = await userService.deleteById(id);
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}
