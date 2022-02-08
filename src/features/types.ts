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
export interface formState {
  formNumber: number;
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
  subjects: readSubject;
  modalState: modalState;
  formState: formState;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}
export interface loginUser {
  is_login: boolean;
  data: User;
}
export interface authState {
  loginUser: loginUser;
}
/*notifySelfSlice.ts*/
export interface notifySelf {
  id: number;
  notifyType: number;
  notifyIsChecked: boolean;
  toUid: string;
  fromUid: string;
  commentId: number;
  createdAt: string;
  updatedAt: string;
  fromUserName: string;
}
export interface readNotifySelf {
  data: notifySelf[];
}
export interface notifySelfState {
  notifySelves: readNotifySelf;
}
/*notificationSlice*/
export interface notification {
  id: number;
  uid: string;
  groupId: number;
  notificationTitle: string;
  notificationContent: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  studentUid: null | string;
}
export interface readNotification {
  data: notification[];
}
export interface notificationState {
  notifications: readNotification;
}
/*commentSlice*/
export interface comment {
  id: number;
  subjectId: number;
  uid: string;
  parentCommentId: null | number;
  commentContent: string;
  commentIsSettled: boolean;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userIsStudent: number;
  subjectName: string;
  subjectIsSecret: number;
  voteCount: number;
  voted: number;
}
export interface readComment {
  data: comment;
}
export interface readComments {
  data: comment[];
}
export interface postComment {
  subjectId: number;
  uid: string;
  parentCommentId: null | number;
  commentContent: string;
  commentIsSettled: boolean;
}
export interface putComment {
  id: number;
  subjectId: number;
  uid: string;
  parentCommentId: null | number;
  commentContent: string;
  commentIsSettled: boolean;
}
export interface vote {
  id: number;
  commentId: number;
  uid: string;
  created_at: string;
  updated_at: string;
}
export interface postVote {
  commentId: number;
  uid: string;
}
export interface readVote {
  data: vote;
}
export interface commentState {
  comments: readComments;
  commentDetails: readComments;
  textpearComments: readComments;
  editedComment: postComment;
}
