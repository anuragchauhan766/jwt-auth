import { Router } from "express";
import {
  forgotpassword,
  signin,
  refresh,
  resetpassword,
  sendVerificationMail,
  signout,
  signup,
  verifyemail,
} from "../controller/auth.controller.js";
import { checkSchema } from "express-validator";
import {
  loginschema,
  registrationSchema,
  validate,
} from "../utils/validator.js";

const router = Router();

router.post("/signin", validate(checkSchema(loginschema)), signin);

router.post("/signup", validate(checkSchema(registrationSchema)), signup);
router.get("/refresh", refresh);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/verifyemail", verifyemail);
router.post("/send-verification-mail", sendVerificationMail);
router.get("/signout", signout);
export default router;
