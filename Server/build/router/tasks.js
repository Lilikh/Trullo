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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskCrud_1 = require("../models/taskCrud");
const router = express_1.default.Router();
//Create get task
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, taskCrud_1.getTask)();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unkonw error' });
    }
}));
//get task by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield (0, taskCrud_1.taskById)(req.params.id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknow error' });
    }
}));
//Create new task
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, taskCrud_1.createTask)(req.body);
        res.status(201).json(tasks);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unkonw error' });
    }
}));
// update Task
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield (0, taskCrud_1.updateTask)(req.params.id, req.body);
        res.json(updatedTask);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unkonw error' });
    }
}));
//delete Task
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield (0, taskCrud_1.deleteTask)(req.params.id);
        if (!taskCrud_1.deleteTask) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.json(taskCrud_1.deleteTask);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknow error' });
    }
}));
exports.default = router;
