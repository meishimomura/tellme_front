export interface signUpParams {
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
export interface modalState {
  modalOpen: boolean;
}
export interface subjectState {
  id: number;
  subjectName: string;
  subjectIsSecret: boolean;
}
export interface readSubject {
  data: subjectState[];
}
export interface commonState {
  fetchState: string;
  modalState: modalState;
  subjects: readSubject;
}
/*authSlice.ts*/
export interface signInParams {
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
  schoolName: string;
  groupGrade: number;
  groupName: string;
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
