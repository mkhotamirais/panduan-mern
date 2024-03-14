import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./features/collapseSlice";
import v1FccBookReducer from "./features/freecodecamp/v1FccBookSlice";
import reduxThunkReducer from "./features/reduxThunk/reduxThunkSlice";
import { apiSlice } from "./api/apiSlice";
import productRtkReducer from "./features/reduxRtk/productRtkSlice";
import mysqlBasicReducer from "./features/mysqlBasic/mysqlBasicSlice";
// import { productApiSlice } from "./features/reduxRtk/productApiSlice";
import msrProductReducer from "./features/mysqlRelational/msrProductSlice";
import msrUserReducer from "./features/mysqlRelational/msrUserSlice";

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    v1FccBook: v1FccBookReducer,
    reduxThunk: reduxThunkReducer,
    productRtk: productRtkReducer,
    mysqlBasic: mysqlBasicReducer,
    msrProduct: msrProductReducer,
    msrUser: msrUserReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// store.dispatch(productApiSlice.endpoints.getProducts.initiate());
