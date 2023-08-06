import { Request } from "express";
import { ObjectId } from "mongoose";
export interface CustomRequest extends Request {
  user?: {
    _id: ObjectId;
    name: string;
    email: string;
  };
}
