import { NextFunction, Request, Response } from "express";
import { RegisterDto } from "../types/dtos";
import authService from "../services/authService";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registerDto: RegisterDto = req.body;
    const user = await authService.register(registerDto);

    return res.status(200).json({ data: { ...user, password: undefined } });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginDto: RegisterDto = req.body;
    const userWithToken = await authService.login(loginDto);
    return res.status(200).json({ data: userWithToken });
  } catch (err) {
    next(err);
  }
};

export default { register, login };
