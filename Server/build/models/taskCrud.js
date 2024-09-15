"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./task");
//Create Task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_1.Task(req.body);
        const savedTask = yield task.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Read Task
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.Task.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const taskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Update task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTask = yield task_1.Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updateTask);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Delete task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTask = yield task_1.Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = { createTask, getTask, taskById, updateTask, deleteTask };
