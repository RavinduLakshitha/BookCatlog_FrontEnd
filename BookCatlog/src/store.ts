import { configureStore } from "@reduxjs/toolkit";
import { BookApi } from "./services/Books/BookApi";

export const store = configureStore({
  reducer: {
    [BookApi.reducerPath]: BookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

