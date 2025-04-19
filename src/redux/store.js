// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/users/userSlice"; // adjust path as needed

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
