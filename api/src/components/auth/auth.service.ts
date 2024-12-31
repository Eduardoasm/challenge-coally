import jwt from 'jsonwebtoken';
import { verify } from 'argon2';
import { JWTPayload } from './auth.dto';
import { IUser } from '../user/user.dto';
import { userService } from '../user/user.service';

function signJWT({
  user,
  secret = process.env.JWT_SECRET!,
  expiresIn = '1d',
}: {
  user: IUser;
  secret?: string;
  expiresIn?: string;
}) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    } satisfies JWTPayload,
    secret,
    {
      expiresIn,
    }
  );
}

function verifyJWT({
  token,
  secret = process.env.JWT_SECRET!,
  options,
}: {
  token: string;
  secret?: string;
  options?: jwt.VerifyOptions;
}) {
  try {
    const cleanToken = token.replace('Bearer ', '');
    return jwt.verify(cleanToken, secret, options) as JWTPayload;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
  }
}

async function signIn({
  email,
  password,
}: { 
  email: IUser['email'], password: IUser['password']
}): Promise<{ user: IUser, token: string }> {
  const user = await userService.findOne({
    email: email.toLowerCase(),
    active: true,
  });

  if (!user.password || !password) {
    throw new Error('invalid-credentials');
  }

  // Compare passwords with argon2
  const compare = await verify(user.password, password);
  if (!compare) {
    throw new Error('invalid-credentials');
  }

  const token = signJWT({ user });

  return {
    user,
    token,
  };
}

async function signUp({
  firstName, lastName, email, password
}: IUser): Promise<string> {
  const user = await userService.create({ firstName, lastName, email, password });

  const token = signJWT({
    user,
    secret: process.env.JWT_SECRET!,
    expiresIn: '5m',
  });

  return token
}

async function currentUser(token: string) {
  if (!token) {
    return null;
  }

  // We get the userId from the token
  const payload = verifyJWT({ token });

  const user = await userService.findOne({
    _id: payload?._id,
    active: true,
  });

  if(!user) throw new Error('Unauthorized: Invalid user')

  return user;
}

export const authService = Object.freeze({
  signIn,
  signUp,
  currentUser,
  signJWT,
})