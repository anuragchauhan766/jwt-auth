import { NextFunction, Response, Request } from "express";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let err: unknown, status: number;
  if (error instanceof ErrorResponse) {
    status = error.statusCode;
    err = {
      name: error.name,
      message: error.message,
    };
  } else if (error instanceof jwt.JsonWebTokenError) {
    status = 401;
    err = {
      name: error.name,
      message: error.message,
    };
  } else if (error instanceof Error.ValidationError) {
    const errors: any = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    status = 400;
    err = {
      name: "ValidationError",
      message: "Validation Error",
      errors,
    };
  } else {
    status = 500;
    err = "Internal server error";
  }
  res.status(status).json({
    success: false,
    error: err,
  });
};
export default errorHandler;
