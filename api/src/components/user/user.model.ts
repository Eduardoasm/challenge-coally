import { hash } from 'argon2';
import { Schema, Document, Types, Model, model, models } from 'mongoose';
import { IUser } from './user.dto';

export type UserDocument = Document<Types.ObjectId, any, IUser> & IUser;

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Por favor ingrese un correo electrónico'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    loginToken: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await hash(this.password);
  }
  next();
});

userSchema.pre('save', async function (next) {
  this.email = this.email.toLowerCase();
  next();
});

export const User = model<IUser>('User', userSchema);
