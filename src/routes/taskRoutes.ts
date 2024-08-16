import { Router } from "express";
import taskController from "../controllers/taskController";

const router = Router();

router.post("/", taskController.createTask);

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.patch("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

export default router;
