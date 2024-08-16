import { Router } from "express";
import authController from "../controllers/authController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { RegisterDto } from "../types/dtos";

const router = Router();

router.post(
  "/register",
  validationMiddleware(RegisterDto),
  authController.register
);
router.post("/login", validationMiddleware(RegisterDto), authController.login);

export default router;
