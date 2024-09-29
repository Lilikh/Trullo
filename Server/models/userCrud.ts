import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "./user";


// Create User

export const createUser=async(user:string)=>{
  const newUser= new User(user);
  return await newUser.save();
}

//get User
export const getUser=async()=>{
  return await User.find();
};
export const userById=async(id:string)=>{
  return await User.findById(id);
}

//Upadate User
export const updateUser=async(id:string, user:any)=>{
  return await User.findByIdAndUpdate(id, user, { new: true, runValidators:true });

}

export const deleteUser=async(id:string)=>{
  return await User.findByIdAndDelete(id);
}


export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

// Verify password (comparing hashed passwords)
export const verifyPassword = async (inputPassword: string, storedPasswordHash: string) => {
  return await bcrypt.compare(inputPassword, storedPasswordHash);
};