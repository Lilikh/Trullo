import { Schema, model, Document } from "mongoose";
export interface IProject extends Document {
  name: string;
  description: string;
  createdAt: Date;
  tasks: string[];
}
const ProjectSchema = new Schema<IProject>({
  name: { type: String, require: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});
export const Project = model<IProject>("Project", ProjectSchema);
