import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import client from "lib/api/client";
import Cookies from "js-cookie";
import { readNotification, notificationState } from "features/types";

export const fetchAsyncGetNotifications = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    const res = await client.get<readNotification>(`/notifications/user/`, {
      headers: {
        "access-token": `${Cookies.get("_access_token")}`,
        client: `${Cookies.get("_client")}`,
        uid: `${Cookies.get("_uid")}`,
      },
    });
    return res.data;
  }
);

const initialState: notificationState = {
  notifications: {
    data: [
      {
        id: 0,
        uid: "",
        groupId: 0,
        notificationTitle: "",
        notificationContent: "",
        createdAt: "",
        updatedAt: "",
        studentUid: null,
        userName: "",
      },
    ],
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetNotifications.fulfilled,
      (state, action: PayloadAction<readNotification>) => {
        return {
          ...state,
          notifications: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetNotifications.rejected, () => {
      window.location.href = "/signin";
    });
  },
});

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;
export default notificationSlice.reducer;
