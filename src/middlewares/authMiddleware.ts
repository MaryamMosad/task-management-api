import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/errorHandler";
import authService from "../services/authService";

export const authMiddleware = async (
  req,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await extractTokenFromRequestHeader(req);

    if (!token) throw new HttpError("Unauthorized", 401);

    const user = await authService.getUserFromJWT(token);
    if (!user) throw new HttpError("Unauthorized", 401);
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

const extractTokenFromRequestHeader = (req: Request): string | null => {
  const authToken = (req.headers["authorization"] ||
    req.headers["Authorization"]) as string;

  if (!authToken?.startsWith("Bearer ")) return null;

  return authToken?.split(" ")?.[1];
};
