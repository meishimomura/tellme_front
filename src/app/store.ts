import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "features/auth/authSlice";
import commonReducer from "features/common/commonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    common: commonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
