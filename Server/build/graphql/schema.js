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
exports.schema = void 0;
const graphql_1 = require("graphql");
const task_1 = require("../models/task");
const user_1 = require("../models/user");
//Task Type
const TaskType = new graphql_1.GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        assignedTo: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        finishedBy: { type: graphql_1.GraphQLString },
    })
});
//User Type
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    })
});
//Input Types for Mutations
const TaskInputType = new graphql_1.GraphQLObjectType({
    name: 'TaskInput',
    fields: () => ({
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        assignedTo: { type: graphql_1.GraphQLString },
    }),
});
const UserInputType = new graphql_1.GraphQLObjectType({
    name: 'UserInput',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    }),
});
//Root Query
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const taskId = args.id;
                    const task = yield task_1.Task.findById(taskId);
                    return task;
                }
                catch (error) {
                    throw new Error(error instanceof Error ? error.message : 'Unknow error');
                }
            }),
        },
        tasks: {
            type: new graphql_1.GraphQLList(TaskType),
            resolve() {
                return task_1.Task.find();
            },
        },
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return user_1.User.findById(args.id);
            }
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve() {
                return user_1.User.find();
            }
        }
    }
});
//Mutations
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                input: { type: new graphql_1.GraphQLNonNull(TaskInputType) },
            },
            resolve(parent, args) {
                const task = new task_1.Task(args.input);
                return task.save();
            },
        },
        updateTask: {
            type: TaskType,
            args: {
                id: { type: graphql_1.GraphQLID },
                input: { type: new graphql_1.GraphQLNonNull(TaskInputType) },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const { id, input } = args; // Safely destructure args
                    const updatedUser = yield user_1.User.findByIdAndUpdate(id, input, { new: true }); // Use async/await
                    return updatedUser;
                }
                catch (error) {
                    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
                }
            }),
        },
        deleteTask: {
            type: TaskType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return task_1.Task.findByIdAndDelete(args.id);
            },
        },
        addUser: {
            type: UserType,
            args: {
                input: { type: new graphql_1.GraphQLNonNull(UserInputType) },
            },
            resolve(parent, args) {
                const user = new user_1.User(args.input);
                return user.save();
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: graphql_1.GraphQLID },
                input: { type: new graphql_1.GraphQLNonNull(UserInputType) },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const { id, input } = args; // Safely destructure args
                    const updatedUser = yield user_1.User.findByIdAndUpdate(id, input, { new: true }); // Use async/await
                    return updatedUser;
                }
                catch (error) {
                    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
                }
            }),
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return user_1.User.findByIdAndDelete(args.id);
            },
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
