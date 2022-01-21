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
/*commonSlice*/
export interface commonState {
  fetchState: string;
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
  is_login: boolean;
  data: User;
}
export interface authState {
  loginUser: loginUser;
}
