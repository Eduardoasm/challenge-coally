import { IUser } from "../user/user.dto";

export interface JWTPayload {
  _id: IUser['_id'];
  email: IUser['email'];
}
