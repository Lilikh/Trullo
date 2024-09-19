import express, { Request, Response } from "express";
import {
  getUser,
  userById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userCrud";
const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUser();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknow error occurred",
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = await userById(req.params.id);
    if (!userId) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(202).json(userId);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "An unkonw error occured",
    });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const createedUser = await createUser(req.body);
    res.status(201).json(createedUser);
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "An unkonw error",
      });
  }
});
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "An unkonw error",
      });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res
      .status(500)
      .json({
        error: error instanceof Error ? error.message : "An unkonw error",
      });
  }
});
export default router;
