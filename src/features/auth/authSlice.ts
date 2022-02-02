import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import { signInParams, loginUser, authState } from "../types";

export const fetchAsyncSignIn = createAsyncThunk(
  "auth/signin",
  async (auth: signInParams) => {
    const res = await client.post<any>("auth/sign_in", auth);
    return res;
  }
);

export const fetchAsyncGetUser = createAsyncThunk("auth/getUser", async () => {
  const res = await client.get<loginUser>(`/users/`, {
    headers: {
      "access-token": `${Cookies.get("_access_token")}`,
      client: `${Cookies.get("_client")}`,
      uid: `${Cookies.get("_uid")}`,
    },
  });
  return res.data;
});

export const fetchAsyncSignOut = createAsyncThunk("auth/sign_out", async () => {
  const res = await client.delete(`/auth/sign_out/`, {
    headers: {
      "access-token": `${Cookies.get("_access_token")}`,
      client: `${Cookies.get("_client")}`,
      uid: `${Cookies.get("_uid")}`,
    },
  });
  return res.data;
});

const initialState: authState = {
  loginUser: {
    is_login: false,
    data: {
      uid: "",
      provider: "",
      email: "",
      userName: "",
      userImage: "",
      schoolId: 0,
      groupId: 0,
      userIsStudent: true,
      allowPasswordChange: false,
      created_at: new Date("01/01/70 00:00:00"),
      updated_at: new Date("01/01/70 00:00:00"),
      schoolName: "",
      groupGrade: 0,
      groupName: "",
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncSignIn.fulfilled,
      (state, action: PayloadAction<any>) => {
        Cookies.set("_access_token", action.payload.headers["access-token"]);
        Cookies.set("_client", action.payload.headers["client"]);
        Cookies.set("_uid", action.payload.headers["uid"]);

        window.location.href = "/home";
      }
    );
    builder.addCase(
      fetchAsyncGetUser.fulfilled,
      (state, action: PayloadAction<loginUser>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetUser.rejected, () => {
      window.location.href = "/signin";
    });
    builder.addCase(fetchAsyncSignOut.fulfilled, () => {
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");

      window.location.href = "/signin";
    });
  },
});

export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export default authSlice.reducer;
