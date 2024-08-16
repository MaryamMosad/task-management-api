import express, { Application } from "express";
import bodyParser from "body-parser";
import dbConnection from "./config/database";
import authRouter from "./routes/authRoutes";
import taskRouter from "./routes/taskRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";

const app: Application = express();

app.use(bodyParser.json());

dbConnection();

app.use("/auth", authRouter);
app.use("/tasks", authMiddleware, taskRouter);

app.use(errorMiddleware);

export default app;
