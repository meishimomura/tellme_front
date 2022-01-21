import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { REQUEST_STATE } from "../../constants";
import { fetchAsyncSignIn, fetchAsyncGetUser } from "features/auth/authSlice";
import { commonState } from "features/types";

const initialState: commonState = {
  fetchState: REQUEST_STATE.INITIAL,
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
  },
});

export const selectFetchState = (state: RootState) => state.common.fetchState;
export default commonSlice.reducer;
