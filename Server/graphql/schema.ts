import { GraphQLObjectType, GraphQLSchema, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";
import { Task, ITask } from "../models/task";
import {User,IUser} from "../models/user";
import { Document } from "mongoose";
import { taskById } from "../models/taskCrud";


//Task Type

const TaskType=new GraphQLObjectType({
    name:'Task',
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        description:{type: GraphQLString},
        status:{type:GraphQLString},
        assignedTo:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        finishedBy:{type:GraphQLString},

    })
});

//User Type
const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
    })
})

//Input Types for Mutations

const TaskInputType= new GraphQLObjectType({
    name:'TaskInput',
    fields:()=>({
       title:{type:GraphQLString},
       description:{type:GraphQLString}, 
       status:{type:GraphQLString},
       assignedTo:{type:GraphQLString},
    }),
});

const UserInputType= new GraphQLObjectType({
    name:'UserInput',
    fields:()=>({
       name:{type:GraphQLString},
       email:{type:GraphQLString}, 
       password:{type:GraphQLString},
    }),
})

//Root Query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        task:{
            type:TaskType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve:async(parent: any, args: { [id: string]: any }) =>{
                 try {
                    const taskId=args.id as string;
                    const task=await Task.findById(taskId)
                    return task;
                 } catch (error) {
                    throw new Error(error instanceof Error ? error.message:'Unknow error')
                 }
            },
        },
        tasks:{
            type: new GraphQLList(TaskType),
            resolve(){
                return Task.find();
            },
        },
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent:any, args:{[id:string]:any}){
                return User.findById(args.id);
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(){
                return User.find();
            }
        }
    }

});

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTask: {
        type: TaskType,
        args: {
          input: { type: new GraphQLNonNull(TaskInputType) },
        },
        resolve(parent: any, args: { [input: string]:any }) {
          const task = new Task(args.input);
          return task.save();
        },
      },
      updateTask: {
        type: TaskType,
        args: {
          id: { type: GraphQLID },
          input: { type: new GraphQLNonNull(TaskInputType) },
        },
        resolve: async (parent: any, args: { [argName: string]: any }) => {
            try {
                const { id, input } = args;  // Safely destructure args
                const updatedUser = await User.findByIdAndUpdate(id as string, input, { new: true });  // Use async/await
                return updatedUser;
            } catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
            }
        },
        
      },
      deleteTask: {
        type: TaskType,
        args: { id: { type: GraphQLID } },
        resolve(parent: any, args: { [id: string ]:any}) {
          return Task.findByIdAndDelete(args.id);
        },
      },
      addUser: {
        type: UserType,
        args: {
          input: { type:new GraphQLNonNull (UserInputType) },
        },
        resolve(parent: any, args: { [input: string]:any }) {
          const user = new User(args.input);
          return user.save();
        },
      },
      updateUser: {
        type: UserType,
        args: {
          id: { type: GraphQLID },
          input: { type: new GraphQLNonNull(UserInputType) },
        },
        resolve: async (parent: any, args: { [argName: string]: any }) => {
            try {
                const { id, input } = args;  // Safely destructure args
                const updatedUser = await User.findByIdAndUpdate(id as string, input, { new: true });  // Use async/await
                return updatedUser;
            } catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
            }
        },
        
      },
      deleteUser: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parent: any, args: { [id: string ]:any}) {
          return User.findByIdAndDelete(args.id);
        },
      },
    },
  });
  
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });