import { Schema, model, Document, Types } from "mongoose";
export interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  status: "to-do" | "in progress" | "blocked" | "done";
  assignedTo?: Types.ObjectId;
  createdAt: Date;
  finishedBy: Date;
  tags:string[];
  project:Types.ObjectId; // id of project this task belongs to
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["to-do", "in progress", "blocked", "done"],
    default: "to-do",
    required: true,
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  finishedBy: { type: Date },
  tags:[{type:String}],
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  
});
export const Task = model<ITask>("Task", TaskSchema);
function newFunction(): string | import("mongoose").Model<any, {}, {}, {}, any, any> | ((this: any, doc: any) => string | import("mongoose").Model<any>) | undefined {
  return 'Project';
}

