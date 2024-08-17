import { NextFunction, Request, Response } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../types/dtos";
import taskService from "../services/taskService";
import { HttpError } from "../utils/errorHandler";

const createTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const createTaskDto: CreateTaskDto = req.body;
    const userId = req.user?.id;
    const task = await taskService.createTask(createTaskDto, userId);
    return res.status(201).json({ data: task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const updateTaskDto: UpdateTaskDto = req.body;
    const { id } = req.params;
    let task = await taskService.findTaskByIdOrError(id);
    const isUpdated = await taskService.updateTask(updateTaskDto, id);
    if (isUpdated) {
      const task = await taskService.findTaskByIdOrError(id);
      return res.status(200).json({ data: task });
    } else {
      throw new HttpError("failed to update", 500);
    }
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await taskService.findTaskByIdOrError(id);
    return res.status(200).json({ data: task });
  } catch (err) {
    next(err);
  }
};

const getAllTasks = async (req, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.search;
    const statusFilter = req.query.status;
    const priorityFilter = req.query.priority;

    const skip = (page - 1) * limit;

    const { tasks, totalTasks } = await taskService.getPaginatedList(
      skip,
      limit,
      userId,
      keyword,
      {
        status: statusFilter,
        priority: priorityFilter,
      }
    );

    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({
      pageInfo: {
        page: page,
        limit: limit,
        totalTasks,
        totalPages,
      },
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await taskService.findTaskByIdOrError(id);

    const deletedRes = await taskService.deleteTask(id);
    return res
      .status(200)
      .json({ message: deletedRes ? "success" : "failed to delete" });
  } catch (err) {
    next(err);
  }
};

export default { createTask, deleteTask, updateTask, getTaskById, getAllTasks };
