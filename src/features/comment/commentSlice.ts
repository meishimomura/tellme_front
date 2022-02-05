import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import { readComments, commentState } from "features/types";

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
        userIsStudent: 0,
        subjectName: "",
      },
    ],
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
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
  },
});

export const selectComments = (state: RootState) => state.comment.comments;
export default commentSlice.reducer;
