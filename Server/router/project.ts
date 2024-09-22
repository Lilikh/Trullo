import express, { Request, Response } from "express";
import {
  createProject,
  getProject,
  projectById,
  updateProject,
  deleteProject,
} from "../models/projectCrud";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await getProject();
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Unkonw error" });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const project = await projectById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Unkonw error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const createdProject = await createProject(req.body);
    res.status(201).json(createdProject);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Unkonw error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedProject = await updateProject(req.params.id, req.body);
    res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Unkonw error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedProject = await deleteProject(req.params.id);
    res.status(200).json(deletedProject);
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Unkonw error" });
  }
});

export default router;