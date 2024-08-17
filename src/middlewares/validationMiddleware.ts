import "reflect-metadata";
import { RequestHandler } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ClassValidatorType } from "../types/enums";

export function validationMiddleware(
  dtoClass: new () => object,
  validationType: ClassValidatorType = ClassValidatorType.BODY
): RequestHandler {
  return async (req, res, next) => {
    const objectToValidate = plainToInstance(dtoClass, req[validationType]);
    const errors = await validate(objectToValidate);
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        message: errors.map((err) => Object.values(err.constraints)[0])[0],
      });
    }
    req[validationType] = objectToValidate;
    next();
  };
}
