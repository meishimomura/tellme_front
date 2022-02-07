import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import {
  comment,
  readComment,
  readComments,
  postComment,
  commentState,
} from "features/types";

export const fetchAsyncGetComments = createAsyncThunk(
  "comment/getComments",
  async () => {
    const res = await client.get<readComments>(`/comments/common/`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetCommentsTeacher = createAsyncThunk(
  "comment/getCommentsTeacher",
  async () => {
    const res = await client.get<readComments>(`/comments/all/`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateComment = createAsyncThunk(
  "comment/createComment",
  async (comment: postComment) => {
    const res = await client.post<readComment>(`/comments/`, comment, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

const initialState: commentState = {
  comments: {
    data: [
      {
        id: 0,
        subjectId: 0,
        uid: "",
        parentCommentId: null,
        commentContent: "",
        commentIsSettled: false,
        createdAt: "",
        updatedAt: "",
        userName: "",
        userIsStudent: false,
        subjectName: "",
        subjectIsSecret: false,
      },
    ],
  },
  editedComment: {
    subjectId: 0,
    uid: "",
    parentCommentId: null,
    commentContent: "",
    commentIsSettled: false,
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    editComment(state, action: PayloadAction<postComment>) {
      state.editedComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetComments.fulfilled,
      (state, action: PayloadAction<readComments>) => {
        return {
          ...state,
          comments: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetComments.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncGetCommentsTeacher.fulfilled,
      (state, action: PayloadAction<readComments>) => {
        return {
          ...state,
          comments: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetCommentsTeacher.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncCreateComment.fulfilled,
      (state, action: PayloadAction<readComment>) => {
        return {
          ...state,
          editedComment: initialState.editedComment,
          comments: {
            ...state.comments,
            data: action.payload.data.subjectIsSecret
              ? [...state.comments.data]
              : [action.payload.data, ...state.comments.data],
          },
        };
      }
    );
    builder.addCase(fetchAsyncCreateComment.rejected, () => {
      window.location.href = "/signin";
    });
  },
});

export const { editComment } = commentSlice.actions;
export const selectComments = (state: RootState) => state.comment.comments;
export const selectEditedComment = (state: RootState) =>
  state.comment.editedComment;
export default commentSlice.reducer;
