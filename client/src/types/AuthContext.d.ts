import { LoginDataType, SignupDataType, UserDataType } from "./User";

export type Login = ({ email, password }: LoginDataType) => Promise<string>;
export type Signup = ({
  name,
  email,
  dob,
  gender,
  password,
}: SignupDataType) => Promise;
export type ForgotPassword = (email: string) => Promise<string>;
export type ResetPassword = (
  password: string,
  resetpasswordToken: string
) => Promise<string>;
export type RefreshAccessToken = () => Promise<string | undefined>;
export interface AuthContextType {
  user?: Partial<UserDataType>;
  login: Login;
  signup: Signup;
  signout: () => Promise<string>;
  forgotpassword: ForgotPassword;
  resetpassword: ResetPassword;
}

export interface AuthResponse {
  success: boolean;
  user?: Partial<UserDataType>;
  accessToken?: string;
  error?: {
    name: string;
    message: string;
  };
}
