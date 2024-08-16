import "reflect-metadata";
import { RequestHandler } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export function validationMiddleware(
  dtoClass: new () => object
): RequestHandler {
  return async (req, res, next) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        message: errors.map((err) => Object.values(err.constraints)[0])[0],
      });
    }
    req.body = dtoInstance;
    next();
  };
}
