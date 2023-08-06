export interface LoginDataType {
  email: string;
  password: string;
}
export interface SignupDataType extends LoginDataType {
  name: string;
  dob: string;
  gender: string;
  password: string;
}
export interface UserDataType extends SignupDataType {
  _id: string;
  isVerified: boolean;
}
