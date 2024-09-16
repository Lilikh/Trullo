import express, {Request, Response} from 'express'

import {User} from './user'

//Create User
const createUser=async(req:Request, res:Response)=>{
    try {
        const createdUser=new User(req.body)
        const savedUser=await createdUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(400).json({error:'An unknow error occurred'})
        }

    }
};

//Get User

const getUser=async(req:Request, res:Response)=>{
    try {
        const findUser= await User.find();
        res.status(200).json(findUser)
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message});
        }else{
            res.status(500).json({error:'An unknow error occurred'})
        }
    }
};

//Get UserById

const findUserById=async(req:Request, res:Response)=>{
 try {
    const userById= await User.findById(req.params.id);
    if(!userById){
        res.status(404).json({error:'User not found'})
    }
    res.status(200).json(userById)
 } catch (error) {
    if(error instanceof Error){
        res.status(500).json({error:error.message});
    }else{
        res.status(500).json({error:'An unknow error occurred'})
    }
 }
}

//Update User
const updateUser=async(req:Request, res:Response)=>{
    try {
        const updatedUser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updateUser){
            res.status(404).json({error:'User not found'})
        }
        res.status(200).json(updatedUser)
    } catch (error) {
       if(error instanceof Error){
        res.status(400).json({error:error.message});
       }else{
        res.status(400).json({error:'An unknow error occurred'})
       }
    };
}

//Delete User
const deleteUser=async(req:Request, res:Response)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            res.status(404).json({error:'User not found'})
        }
        res.status(200).json({message:'User deleted successfully'})

    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }else{
            res.status(500).json({error:'An unknow error occurred'})
        }
    }
}


module.exports={createUser, getUser,findUserById,updateUser, deleteUser }