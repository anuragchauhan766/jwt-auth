import { Date, Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import moment from "moment";
import validator from "validator";
export interface IUser {
  name: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  resetPasswordToken?: string;
  isVerified: boolean;
}

export interface UserDocument extends IUser, Document {
  matchPassword(inputPassword: string): Promise<boolean>;
  getSignedToken(): { accessToken: string; refreshToken: string };
  getResetPasswordToken(): Promise<string>;
  getActivationToken(): Promise<string>;
}
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, "Name required"],
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, "Email required"],
    validate: {
      validator: function (value: string) {
        return validator.default.isEmail(value);
      },
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 8,
  },
  dob: {
    type: String,
    required: [true, "Date of birth required"],
  },
  gender: {
    type: String,
    validate: {
      validator: function (value: string) {
        return ["Male", "Female", "Others"].includes(value);
      },
      message: (props) => `${props.value} is not supported`,
    },
  },
  resetPasswordToken: {
    type: String,
    default: undefined,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("dob")) {
    next();
  }
  this.dob = moment(this.dob, "DD-MM-YYYY").format("DD-MM-YYYY");
  next();
});

userSchema.methods = {
  matchPassword: function (inputPassword: string) {
    return bcrypt.compare(inputPassword, this.password);
  },

  getSignedToken: function (this: UserDocument) {
    const accessToken = jwt.sign(
      { id: this._id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { id: this._id },
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
      {
        expiresIn: "1min",
      }
    );
    return { accessToken, refreshToken };
  },
  getResetPasswordToken: async function (this: UserDocument) {
    const randomstring = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = jwt.sign(
      {
        randomstring,
        id: this._id,
        email: this.email,
      },
      process.env.RESET_PASSWORD_SECRET_KEY as string,
      {
        expiresIn: "1min",
      }
    );
    this.resetPasswordToken = randomstring;
    await this.save();
    return resetPasswordToken;
  },
  getActivationToken: async function (this: UserDocument) {
    const randomstring = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = jwt.sign(
      {
        randomstring,
        id: this._id,
        email: this.email,
      },
      process.env.ACTIVATION_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    return resetPasswordToken;
  },
};

export default model<UserDocument>("user", userSchema);
