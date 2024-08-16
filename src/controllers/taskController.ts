import { NextFunction, Request, Response } from "express";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(201).end();
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export default { createTask, deleteTask, updateTask, getTaskById, getAllTasks };
