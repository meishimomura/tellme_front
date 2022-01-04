import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import { SignInParams, User, authState } from "../types";

export const fetchAsyncSignIn = createAsyncThunk(
  "auth/signin",
  async (auth: SignInParams) => {
    const res = await client.post<User | any>("auth/sign_in", auth);
    return res;
  }
);

const initialState: authState = {
  loginUser: {
    uid: "",
    email: "",
    userName: "",
    userImage: "",
    schoolId: 0,
    groupId: 0,
    userIsStudent: true,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncSignIn.fulfilled,
      (state, action: PayloadAction<User | any>) => {
        console.log('action.payload.headers["access-token"]');
        Cookies.set("_access_token", action.payload.headers["access-token"]);
        Cookies.set("_client", action.payload.headers["client"]);
        Cookies.set("_uid", action.payload.headers["uid"]);

        window.location.href = "/home";

        console.log("Signed in successfully!");
      }
    );
  },
});

export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export default authSlice.reducer;
