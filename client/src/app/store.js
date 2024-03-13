import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./features/collapseSlice";
import v1FccBookReducer from "./features/freecodecamp/v1FccBookSlice";

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    v1FccBook: v1FccBookReducer,
  },
});
