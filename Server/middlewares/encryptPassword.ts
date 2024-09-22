import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { Document } from "mongoose";

export interface IUserDocument extends Document {
  password: string;
  isModified(field: string): boolean;
}
const SALT_ROUNDS = 10;

export const encryptPassword = async function (
  this: IUserDocument,
  next: NextFunction
) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};
