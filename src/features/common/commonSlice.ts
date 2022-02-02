import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import { REQUEST_STATE } from "../../constants";
import { fetchAsyncSignIn, fetchAsyncGetUser } from "features/auth/authSlice";
import { commonState, readSubject } from "features/types";

export const fetchAsyncGetSubject = createAsyncThunk(
  "common/getSubject",
  async () => {
    const res = await client.get<readSubject>(`/subjects/user/`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

const initialState: commonState = {
  fetchState: REQUEST_STATE.INITIAL,
  modalState: { modalOpen: false },
  subjects: {
    data: [
      {
        id: 0,
        subjectName: "",
        subjectIsSecret: false,
      },
    ],
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncSignIn.pending, (state) => {
      state.fetchState = REQUEST_STATE.LOADING;
    });
    builder.addCase(fetchAsyncSignIn.fulfilled, (state) => {
      state.fetchState = REQUEST_STATE.OK;
    });
    builder.addCase(fetchAsyncGetUser.pending, (state) => {
      state.fetchState = REQUEST_STATE.LOADING;
    });
    builder.addCase(fetchAsyncGetUser.fulfilled, (state) => {
      state.fetchState = REQUEST_STATE.OK;
    });
    builder.addCase(
      fetchAsyncGetSubject.fulfilled,
      (state, action: PayloadAction<readSubject>) => {
        return {
          ...state,
          subjects: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetSubject.rejected, () => {
      window.location.href = "/signin";
    });
  },
});

export const selectFetchState = (state: RootState) => state.common.fetchState;
export const selectSubjects = (state: RootState) => state.common.subjects;
export default commonSlice.reducer;
