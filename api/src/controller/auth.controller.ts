import { NextFunction, Request, RequestHandler, Response } from "express";
import User, { IUser } from "../models/userSchema.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import { sendMail } from "../services/Sendmail.js";

export const signin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please! Enter Email and Password", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const ismatch = await user.matchPassword(password);

    if (!ismatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    if (!user.isVerified) {
      return next(
        new ErrorResponse("Please Verifiy Your Email and Try again", 401)
      );
    }

    const { accessToken, refreshToken } = user.getSignedToken();

    // send refreshtoken to client in cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      // maxAge: 24 * 60 * 60 * 1000, // 1 day
      maxAge: 3 * 60 * 1000,

      path: "/api/auth/refresh",
    });

    // send accesstoken to client
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        isVerified: user.isVerified,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, dob, gender }: IUser = req.body;

  if (!name || !email || !password || !dob || !gender) {
    return next(new ErrorResponse("Incorrect data", 400));
  }

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return next(new ErrorResponse("Email already exists", 409));
    }

    user = await User.create({ name, email, password, dob, gender });
    const activationToken = await user.getActivationToken();
    const url = `${process.env.CLIENT_BASE_URL}/auth/emailverification?t=${activationToken}`;
    await sendMail(email, url, name, "Email Verification", "varificationmail");
    res.status(201).json({
      success: true,
      message: "Email Verifcation mail has been sent",
    });
  } catch (error) {
    return next(error);
  }
};

export const refresh: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken: string | undefined = req.cookies.refreshtoken;

  if (!refreshToken) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  // verify the refresh token
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY as string
    ) as JwtPayload;
    if (!decoded || !decoded.id) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: "15s",
      }
    );
    res.status(201).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const forgotpassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetPasswordToken = await user.getResetPasswordToken();
    const reseturl = `${process.env.CLIENT_BASE_URL}/auth/resetpassword?t=${resetPasswordToken}`;
    const name = user.name;
    await sendMail(
      email,
      reseturl,
      name,
      "RESET YOUR PASSWORD",
      "forgotpasswordmail"
    );
    res
      .status(200)
      .json({ success: true, message: "Password Reset Email sent" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resetpassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resetPasswordToken: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    resetPasswordToken = req.headers.authorization.split(" ")[1];
  }

  if (
    !resetPasswordToken ||
    resetPasswordToken === undefined ||
    resetPasswordToken === null
  ) {
    return next(new ErrorResponse("Unauthoriazed", 401));
  }
  try {
    const decoded = jwt.verify(
      resetPasswordToken,
      process.env.RESET_PASSWORD_SECRET_KEY as string
    ) as JwtPayload;
    const { password }: { password: string } = req.body;
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: decoded.randomstring,
    });
    if (!user) {
      return next(new ErrorResponse("Wrong Reset Password token", 404));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password Reset successfully" });
    next();
  } catch (error) {
    next(error);
  }
};
export const verifyemail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let activationToken = req.query.t as string;

  if (!activationToken) {
    return next(new ErrorResponse("Invalid token", 401));
  }
  try {
    const decoded = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET_KEY as string
    ) as JwtPayload;

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return next(new ErrorResponse("Invalid token", 404));
    }
    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email Verification successfull" });
    next();
  } catch (error) {
    next(error);
  }
};
export const sendVerificationMail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const activationToken = await user.getActivationToken();
    const url = `${process.env.CLIENT_BASE_URL}/auth/emailverification?t=${activationToken}`;
    await sendMail(
      email,
      url,
      user.name,
      "Email Verification",
      "varificationmail"
    );

    res
      .status(200)
      .json({ success: true, message: "Verification Mail Sent successfully" });
    next();
  } catch (error) {
    next(error);
  }
};
export const signout: RequestHandler = async (req, res, next) => {
  res.clearCookie("refreshtoken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/api/auth/refresh",
  });
  res.status(200).json({
    success: true,
    message: "Signout Successfully",
  });
  res.end();
};
