import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import {
  readComment,
  readComments,
  readVote,
  postComment,
  putComment,
  postVote,
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

export const fetchAsyncGetComment = createAsyncThunk(
  "comment/getComment",
  async (commentId: number) => {
    const res = await client.get<readComments>(`/comments/all/${commentId}`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncUpdateComment = createAsyncThunk(
  "comment/updateComment",
  async (comment: putComment) => {
    const res = await client.put<readComments>(
      `/comments/${comment.id}`,
      comment,
      {
        headers: {
          "access-token": `${Cookies.get("_access_token")}`,
          client: `${Cookies.get("_client")}`,
          uid: `${Cookies.get("_uid")}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetTextpearComments = createAsyncThunk(
  "comment/getTextpearComments",
  async (commentId: number) => {
    const res = await client.get<readComments>(`/textpair/${commentId}`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateVote = createAsyncThunk(
  "comment/createVote",
  async (vote: postVote) => {
    const res = await client.post<readVote>(`/votes/`, vote, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncDeleteVote = createAsyncThunk(
  "comment/deleteVote",
  async (commentId: number) => {
    const res = await client.delete<readVote>(`/votes/${commentId}`, {
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
        subjectIsSecret: 0,
        voteCount: 0,
        voted: 0,
      },
    ],
  },
  commentDetails: {
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
        subjectIsSecret: 0,
        voteCount: 0,
        voted: 0,
      },
    ],
  },
  textpearComments: {
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
        subjectIsSecret: 0,
        voteCount: 0,
        voted: 0,
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
            data:
              action.payload.data.parentCommentId !== null &&
              action.payload.data.subjectIsSecret
                ? [...state.comments.data]
                : [action.payload.data, ...state.comments.data],
          },
          commentDetails: {
            ...state.commentDetails,
            data:
              action.payload.data.parentCommentId === null
                ? [...state.comments.data]
                : [...state.commentDetails.data, action.payload.data],
          },
        };
      }
    );
    builder.addCase(fetchAsyncCreateComment.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncGetComment.fulfilled,
      (state, action: PayloadAction<readComments>) => {
        return {
          ...state,
          commentDetails: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetComment.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncUpdateComment.fulfilled,
      (state, action: PayloadAction<readComments>) => {
        return {
          ...state,
          commentDetails: {
            ...state.commentDetails,
            data: state.commentDetails.data.map((comment) =>
              comment.id === action.payload.data[0].id
                ? action.payload.data[0]
                : comment
            ),
          },
        };
      }
    );
    builder.addCase(fetchAsyncUpdateComment.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncGetTextpearComments.fulfilled,
      (state, action: PayloadAction<readComments>) => {
        return {
          ...state,
          textpearComments: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetTextpearComments.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncCreateVote.fulfilled,
      (state, action: PayloadAction<readVote>) => {
        state.commentDetails.data[0].voteCount =
          state.commentDetails.data[0].voteCount + 1;
        state.commentDetails.data[0].voted = state.commentDetails.data[0].voted
          ? 0
          : 1;
      }
    );
    builder.addCase(fetchAsyncCreateVote.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(
      fetchAsyncDeleteVote.fulfilled,
      (state, action: PayloadAction<readVote>) => {
        state.commentDetails.data[0].voteCount =
          state.commentDetails.data[0].voteCount - 1;
        state.commentDetails.data[0].voted = state.commentDetails.data[0].voted
          ? 0
          : 1;
      }
    );
    builder.addCase(fetchAsyncDeleteVote.rejected, () => {
      window.location.href = "/signin";
    });
  },
});

export const { editComment } = commentSlice.actions;
export const selectComments = (state: RootState) => state.comment.comments;
export const selectCommentDetails = (state: RootState) =>
  state.comment.commentDetails;
export const selectTextpearComments = (state: RootState) =>
  state.comment.textpearComments;
export const selectEditedComment = (state: RootState) =>
  state.comment.editedComment;
export default commentSlice.reducer;
