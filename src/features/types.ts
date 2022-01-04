export interface SignUpParams {
  user_name: string;
  user_image: string;
  email: string;
  school_id: number;
  group_id: number;
  user_is_student: number;
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
  user_name: string;
  user_image: string;
  school_id: number;
  group_id: number;
  user_is_student: boolean;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}
