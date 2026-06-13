import type { Document, Model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  photo?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserModel extends Model<IUser> {}

export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: UserRole;
}
