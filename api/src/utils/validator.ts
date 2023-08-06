import { NextFunction, Request, Response } from "express";
import {
  FieldValidationError,
  Schema,
  ValidationChain,
  validationResult,
} from "express-validator";

export const registrationSchema: Schema = {
  name: {
    notEmpty: true,
    errorMessage: "Name must be Provided",
    escape: true,
  },
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: {
      options: {
        gmail_remove_dots: false,
      },
    },
    errorMessage: "Invalid Email",
    escape: true,
  },
  password: {
    notEmpty: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    escape: true,

    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one symbol",
  },
  dob: {
    notEmpty: true,
    errorMessage: "Date of Birth required",
    escape: true,
  },
  gender: {
    notEmpty: true,
    custom: {
      options: (value: string) => {
        return ["Male", "Female", "Others"].includes(value);
      },
    },
    escape: true,

    errorMessage: "Gender should be Male,Female or Others",
  },
};

export const loginschema: Schema = {
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: {
      options: {
        gmail_remove_dots: false,
      },
    },
    errorMessage: "Invalid Email",
    escape: true,
  },
  password: {
    notEmpty: true,
    errorMessage: "Password must be provided",
    escape: true,
  },
};

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const Results = validationResult(req);
    if (Results.isEmpty()) {
      return next();
    }
    const errors = Results.array().map((error) => {
      if (error.type === "field") {
        return {
          field: error.path,
          message: error.msg,
        };
      } else {
        return {
          type: error.type,
          message: error.msg,
        };
      }
    });
    res.status(400).json({
      success: false,
      errors: errors,
    });
  };
};
