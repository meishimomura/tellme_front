export interface SignUpParams {
  userName: string;
  userImage: string;
  email: string;
  schoolId: number;
  groupId: number;
  userIsStudent: number;
  password: string;
  passwordConfirmation: string;
}
/*authSlice.ts*/
export interface SignInParams {
  email: string;
  password: string;
}
export interface User {
  uid: string;
  provider: string;
  email: string;
  userName: string;
  userImage: string;
  schoolId: number;
  groupId: number;
  userIsStudent: boolean;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface loginUser {
  uid: string;
  email: string;
  userName: string;
  userImage: string;
  schoolId: number;
  groupId: number;
  userIsStudent: boolean;
}
export interface authState {
  loginUser: loginUser;
}
