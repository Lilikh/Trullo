import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  res.send("Hello from tasks");
});

export default router;
