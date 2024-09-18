import express, { Request, Response } from "express";
import { Task } from "./task";
//Create Task
export const createTask = async (task: string) => {
  const newTask = new Task(task);
  return await newTask.save();
};
//Read Task

export const getTask = async () => {
  return await Task.find();
};
export const taskById = async (id: string) => {
  return await Task.findById(id);
};

//Update task
export const updateTask = async (id: string, task: string) => {
  return await Task.findByIdAndUpdate(id, { task }, { new: true });
};

//Delete task
export const deleteTask = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};
