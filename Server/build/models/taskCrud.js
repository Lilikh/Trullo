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
exports.deleteTask = exports.updateTask = exports.taskById = exports.getTask = exports.createTask = void 0;
const task_1 = require("./task");
//Create Task
const createTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = new task_1.Task(task);
    return yield newTask.save();
});
exports.createTask = createTask;
//Read Task
const getTask = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_1.Task.find();
});
exports.getTask = getTask;
const taskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_1.Task.findById(id);
});
exports.taskById = taskById;
//Update task
const updateTask = (id, task) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_1.Task.findByIdAndUpdate(id, { task }, { new: true });
});
exports.updateTask = updateTask;
//Delete task
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_1.Task.findByIdAndDelete(id);
});
exports.deleteTask = deleteTask;
