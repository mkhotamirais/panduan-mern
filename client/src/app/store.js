import { configureStore } from "@reduxjs/toolkit";
import collapseReducer from "./features/collapseSlice";
import v1FccBookReducer from "./features/freecodecamp/v1FccBookSlice";
import reduxThunkReducer from "./features/reduxThunk/reduxThunkSlice";
import { apiSlice } from "./api/apiSlice";
import productRtkReducer from "./features/reduxRtk/productRtkSlice";
// import { productApiSlice } from "./features/reduxRtk/productApiSlice";
import mdV1ProductReducer from "./features/mongodb/mdV1ProductSlice";
import mdV2ProductReducer from "./features/mongodb/mdV2ProductSlice";
import mdV2CategoryReducer from "./features/mongodb/mdV2CategorySlice";
import mdV3ProductReducer from "./features/mongodb/mdV3ProductSlice";
import mysV1ProductReducer from "./features/mysql/mysV1ProductSlice";
import mysV2ProductReducer from "./features/mysql/mysV2ProductSlice";
import mysV2UserReducer from "./features/mysql/mysV2UserSlice";
import mysV3ProductReducer from "./features/mysql/mysV3ProductSlice";
import mysV5ProductReducer from "./features/mysql/mysV5ProductSlice";
import mysV5UserReducer from "./features/mysql/mysV5UserSlice";
import mysV5AuthReducer from "./features/mysql/mysV5AuthSlice";

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    v1FccBook: v1FccBookReducer,
    reduxThunk: reduxThunkReducer,
    productRtk: productRtkReducer,
    mdV1Product: mdV1ProductReducer,
    mdV2Product: mdV2ProductReducer,
    mdV2Category: mdV2CategoryReducer,
    mdV3Product: mdV3ProductReducer,
    mysV1Product: mysV1ProductReducer,
    mysV2Product: mysV2ProductReducer,
    mysV2User: mysV2UserReducer,
    mysV3Product: mysV3ProductReducer,
    mysV5Product: mysV5ProductReducer,
    mysV5User: mysV5UserReducer,
    mysV5Auth: mysV5AuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// store.dispatch(productApiSlice.endpoints.getProducts.initiate());
