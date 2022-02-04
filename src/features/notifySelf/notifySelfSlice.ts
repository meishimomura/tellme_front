import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import { readNotifySelf, notifySelfState } from "features/types";

export const fetchAsyncGetNotifySelves = createAsyncThunk(
  "notifySelf/getNotifySelves",
  async () => {
    const res = await client.get<readNotifySelf>(`/notify_selves/user/`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

const initialState: notifySelfState = {
  notifySelves: {
    data: [
      {
        id: 0,
        notifyType: 0,
        notifyIsChecked: false,
        toUid: "",
        fromUid: "",
        commentId: 0,
        createdAt: "",
        updatedAt: "",
        fromUserName: "",
      },
    ],
  },
};

export const notifySelfSlice = createSlice({
  name: "notifySelf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetNotifySelves.fulfilled,
      (state, action: PayloadAction<readNotifySelf>) => {
        return {
          ...state,
          notifySelves: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetNotifySelves.rejected, () => {
      window.location.href = "/signin";
    });
  },
});

export const selectNotifySelves = (state: RootState) =>
  state.notifySelf.notifySelves;
export default notifySelfSlice.reducer;
