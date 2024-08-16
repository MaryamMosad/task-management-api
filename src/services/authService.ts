import User from "../models/user";
import { RegisterDto } from "../types/dtos";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/errorHandler";

const register = async (input: RegisterDto) => {
  const isUserNameTaken = await findUserByUserName(input.username);

  if (isUserNameTaken)
    throw new HttpError("username already taken, try another one", 403);

  const user = await User.create({
    ...input,
    password: await hashPassword(input.password),
  });
  return user.toJSON();
};

const login = async (input: RegisterDto) => {
  const user = await findUserByUserName(input.username);

  if (!user) throw new HttpError("username doesn't exist", 404);

  const isPasswordCorrect = await matchPassword(
    input.password,
    user?.password!
  );

  if (!isPasswordCorrect)
    throw new HttpError("incorrect username or password", 401);

  return {
    ...user,
    password: undefined,
    accessToken: await generateAuthTokenByUserId(user?._id.toString()),
  };
};

const findUserByUserName = async (username: string) => {
  return (await User.findOne({ username }))?.toJSON();
};

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 15);
};

const matchPassword = async (password: string, passwordHash: string) => {
  return await compare(password, passwordHash);
};

const generateAuthTokenByUserId = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export default {
  register,
  login,
};
