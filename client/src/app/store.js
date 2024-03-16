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
import msfUserReducer from "./features/mysqlFiles/msfUserSlice";
import msaUserReducer from "./features/mysqlAuth/msaUserSlice";
import msaProductReducer from "./features/mysqlAuth/msaProductSlice";
import msaAuthReducer from "./features/mysqlAuth/msaAuthSlice";
import mdV1ProductReducer from "./features/mongodb/mdV1ProductSlice";
import mdV2ProductReducer from "./features/mongodb/mdV2ProductSlice";
import mdV2CategoryReducer from "./features/mongodb/mdV2CategorySlice";

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    v1FccBook: v1FccBookReducer,
    reduxThunk: reduxThunkReducer,
    productRtk: productRtkReducer,
    mysqlBasic: mysqlBasicReducer,
    msrProduct: msrProductReducer,
    msrUser: msrUserReducer,
    msfUser: msfUserReducer,
    msaUser: msaUserReducer,
    msaProduct: msaProductReducer,
    msaAuth: msaAuthReducer,
    mdV1Product: mdV1ProductReducer,
    mdV2Product: mdV2ProductReducer,
    mdV2Category: mdV2CategoryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// store.dispatch(productApiSlice.endpoints.getProducts.initiate());
