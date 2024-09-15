"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
//taske model in typescript
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String,
        enum: ['to-do', 'in progress', 'blocked', 'done'],
        default: 'to-do',
        required: true,
    },
    assignedTo: { type: String },
    createdAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
});
exports.Task = (0, mongoose_1.model)('Task', TaskSchema);
