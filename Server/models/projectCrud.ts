import { IProject, Project } from "./project";

export const createProject=async(peojectData:IProject)=>{
    const newProject=new Project(peojectData)
    return await newProject.save();
}

export const getProject=async()=>{
    return await Project.find();
}

export const projectById=async(id:string)=>{
    return await Project.findById(id)
}

export const updateProject=async(id:string,project:any )=>{
    return await Project.findByIdAndUpdate(id,project, {new:true, runValidators:true});
};

export const deleteProject=async(id:string)=>{
    return await Project.findByIdAndDelete(id);
}