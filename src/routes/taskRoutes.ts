import { Router } from "express";
import taskController from "../controllers/taskController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import {
  CreateTaskDto,
  PaginationQueryParams,
  TasksFilterQueryParams,
  TasksSearchQueryParams,
  UpdateTaskDto,
} from "../types/dtos";
import { ClassValidatorType } from "../types/enums";

const router = Router();

router.post(
  "/",
  validationMiddleware(CreateTaskDto),
  taskController.createTask
);

router.get(
  "/",
  validationMiddleware(PaginationQueryParams, ClassValidatorType.QUERY_PARAMS),
  taskController.getAllTasks
);

router.get(
  "/search",
  validationMiddleware(TasksSearchQueryParams, ClassValidatorType.QUERY_PARAMS),
  taskController.searchTasks
);

router.get(
  "/filter",
  validationMiddleware(TasksFilterQueryParams, ClassValidatorType.QUERY_PARAMS),
  taskController.filterTasks
);

router.get("/:id", taskController.getTaskById);

router.patch(
  "/:id",
  validationMiddleware(UpdateTaskDto),
  taskController.updateTask
);

router.delete("/:id", taskController.deleteTask);

export default router;
