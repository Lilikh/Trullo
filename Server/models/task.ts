//taske model in typescript
import { Schema, model, Document } from "mongoose";
export interface Task{
    id: string;
    title: string;
    description: string;
    status:'to-do'|'in progress'|'blocked'|'done';
    assignedTo?:string;
    createdAt: Date;
    finishedBy:Date;
}

const TaskSchema = new Schema<Task>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String,
         enum: ['to-do', 'in progress', 'blocked', 'done'], 
         default: 'to-do',
        required:true,
     },
    assignedTo: { type: String },
    createdAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
})
export const Task= model<Task>('Task', TaskSchema)