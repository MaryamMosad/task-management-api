import { Schema, model, Document } from "mongoose";
import { TaskPriorityEnum, TaskStatusEnum } from "../types/enums";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      required: true,
    },
    dueDate: { type: Date, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
console.log(Object.values(TaskPriorityEnum))
const Task = model("Task", taskSchema);

export default Task;
