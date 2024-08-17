import { Router } from "express";
import taskController from "../controllers/taskController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateTaskDto, TaskPaginatedListQueryParams, UpdateTaskDto } from "../types/dtos";
import { ClassValidatorType } from "../types/enums";

const router = Router();

router.post(
  "/",
  validationMiddleware(CreateTaskDto),
  taskController.createTask
);

router.get(
  "/",
  validationMiddleware(
    TaskPaginatedListQueryParams,
    ClassValidatorType.QUERY_PARAMS
  ),
  taskController.getAllTasks
);

router.get("/:id", taskController.getTaskById);

router.patch(
  "/:id",
  validationMiddleware(UpdateTaskDto),
  taskController.updateTask
);

router.delete("/:id", taskController.deleteTask);

export default router;
