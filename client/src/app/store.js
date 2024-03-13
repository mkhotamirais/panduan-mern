import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./features/collapseSlice";
import v1FccBookReducer from "./features/freecodecamp/v1FccBookSlice";
import reduxThunkReducer from "./features/reduxThunk/reduxThunkSlice";
import { apiSlice } from "./api/apiSlice";
import productRtkReducer from "./features/reduxRtk/productRtkSlice";

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    v1FccBook: v1FccBookReducer,
    reduxThunk: reduxThunkReducer,
    productRtk: productRtkReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
