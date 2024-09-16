import express,{Request,Response} from 'express';
import {createTask, getTask,taskById,updateTask,deleteTask} from '../models/taskCrud'

const router = express.Router();

//Create get task
router.get('/', async(req:Request, res:Response):Promise<void> => {
    try {
        const tasks= await getTask();
        res.json(tasks);

    } catch (error) {
      res.status(500).json({error:error instanceof Error ? error.message : 'Unkonw error'})
    }
})
//get task by id
router.get('/:id',async(req:Request, res:Response):Promise<void>=>{
   try {
    const task=await taskById(req.params.id);
    if(!task){
        res.status(404).json({message:'Task not found'})
    }
    res.status(200).json(task)
    
   } catch (error) {
    res.status(500).json({error:error instanceof Error ? error.message : 'Unknow error'})
   }

})
//Create new task
router.post('/',async(req:Request,res:Response):Promise<void>=>{
    try {
        const tasks=await createTask(req.body)
        res.status(201).json(tasks)
    } catch (error) {
       res.status(400).json({error:error instanceof Error ? error.message :'Unkonw error'})
    }
})

// update Task
router.put('/:id',async(req:Request, res:Response)=>{
    try {
        const updatedTask=await updateTask(req.params.id,req.body)
        res.json(updatedTask)
    } catch (error) {
        res.status(400).json({error:error instanceof Error ? error.message : 'Unkonw error' })
    }
})

//delete Task
router.delete('/:id', async(req:Request, res:Response)=>{
   try {
    const deletedTask= await deleteTask(req.params.id)
    if(!deleteTask){
        res.status(404).json({message:'Task not found'})
    }
    res.json(deleteTask)
   } catch (error) {
    res.status(500).json({error:error instanceof Error ? error.message : 'Unknow error'})
   }
}
)


export default router;