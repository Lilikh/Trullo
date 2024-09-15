import express, {Request, Response} from 'express';
import { Task }  from './task';
//Create Task
const createTask=async(req: Request, res:Response)=>{
    try {
        const task= new Task(req.body)
        const savedTask=await task.save();
        res.status(201).json(savedTask)
        
    } catch (error) {
        res.status(400).json({error:(error as Error).message});
        
    }

};
//Read Task

const getTask=async(req:Request,res:Response)=>{
    try {
        const tasks=await Task.find();
        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({error:(error as Error).message});

    }
}
const taskById=async(req:Request,res:Response)=>{
    try {
        const task=await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({error:'Task not found'});
            } 
            res.status(200).json(task)
        
       
    } catch (error) {
        res.status(500).json({error:(error as Error).message});
        
    }

};

//Update task
const updateTask=async(req:Request,res:Response)=>{
    try {
        const updateTask=await Task.findByIdAndUpdate(req.params.id, req.body,{new:true} )
        if(!updateTask){
            return res.status(404).json({error:'Task not found'});
            } 
            res.status(200).json(updateTask)
        
    } catch (error) {
        res.status(400).json({error:(error as Error).message})
    }
};

//Delete task
const deleteTask=async(req:Request,res:Response)=>{
    try {
        const deleteTask=await Task.findByIdAndDelete(req.params.id)
        if(!deleteTask){
            res.status(404).json({error:'Task not found'})
        }
        res.status(200).json({message:'Task deleted successfully!'})
    } catch (error) {
       res.status(500).json({error:(error as Error).message}) ;
    }
};





module.exports={createTask, getTask,taskById,updateTask,deleteTask}