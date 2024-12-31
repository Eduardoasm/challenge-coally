
export interface IUser {
  _id?: any;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  loginToken?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
