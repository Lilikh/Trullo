import express,{Request,Response} from 'express';

const router = express.Router();

router.get('/', (req:Request, res:Response):void => {
    res.send('Tasks page');
})


export default router;