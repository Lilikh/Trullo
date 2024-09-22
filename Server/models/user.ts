import { Schema, model, Document } from "mongoose";
import { encryptPassword } from "../middlewares/encryptPassword";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";  
  tasks:string[];
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};



userSchema.pre<IUser>('save', encryptPassword as any);

export const User = model<IUser>("User", userSchema);
