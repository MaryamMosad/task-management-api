import Task from "../models/task";
import { CreateTaskDto, UpdateTaskDto } from "../types/dtos";
import { TaskPriorityEnum, TaskStatusEnum } from "../types/enums";
import { HttpError } from "../utils/errorHandler";

const createTask = async (input: CreateTaskDto, userId: string) => {
  return await Task.create({ ...input, userId });
};

const updateTask = async (input: UpdateTaskDto, taskId: string) => {
  const res = await Task.updateOne({ _id: taskId }, { $set: input });
  return res.modifiedCount > 0;
};

const findTaskByIdOrError = async (taskId: string) => {
  const task = await Task.findOne({ _id: taskId });
  if (!task) throw new HttpError("Task not found", 404);
  return task;
};

const deleteTask = async (taskId: string) => {
  const res = await Task.deleteOne({ _id: taskId });
  return res.deletedCount > 0;
};

const getPaginatedList = async (
  skip: number,
  limit: number,
  userId: string,
  keyword: string,
  filter: {
    status?: TaskStatusEnum;
    priority?: TaskPriorityEnum;
  } = {}
) => {
  const whereOptions: any = {
    userId,
    ...(keyword && {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }),
    ...(filter?.priority && { priority: filter.priority }),
    ...(filter?.status && { status: filter.status }),
  };

  const tasks = await Task.find(whereOptions).skip(skip).limit(limit);

  const totalTasks = await Task.countDocuments(whereOptions);

  return { tasks, totalTasks };
};

export default {
  createTask,
  updateTask,
  findTaskByIdOrError,
  deleteTask,
  getPaginatedList,
};
