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
const user_1 = require("./user");
//Create User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = new user_1.User(req.body);
        const savedUser = yield createdUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknow error occurred' });
        }
    }
});
//Get User
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield user_1.User.find();
        res.status(200).json(findUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknow error occurred' });
        }
    }
});
//Get UserById
const findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userById = yield user_1.User.findById(req.params.id);
        if (!userById) {
            res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(userById);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknow error occurred' });
        }
    }
});
//Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateUser) {
            res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknow error occurred' });
        }
    }
    ;
});
//Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknow error occurred' });
        }
    }
});
module.exports = { createUser, getUser, findUserById, updateUser, deleteUser };
