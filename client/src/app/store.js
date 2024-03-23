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
import mysV4AuthReducer from "./features/mysql/mysV4AuthSlice";
import mysV4ProductReducer from "./features/mysql/mysV4ProductSlice";
import mysV4UserReducer from "./features/mysql/mysV4UserSlice";
import mysV5ProductReducer from "./features/mysql/mysV5ProductSlice";
import mysV5UserReducer from "./features/mysql/mysV5UserSlice";
import mysV5AuthReducer from "./features/mysql/mysV5AuthSlice";
import { dgApiSlice } from "./api/dgApiSlice";
import dgV2UserReducer from "./features/davegray/dgV2UserSlice";
import dgV2EmployeeReducer from "./features/davegray/dgV2EmployeeSlice";
import dgV2NoteReducer from "./features/davegray/dgV2NoteSlice";
import dgV2AuthReducer from "./features/davegray/dgV2AuthSlice";
// import { dgV2UsersApiSlice } from "./api/dgApiEndpoint/dgV2UsersApiSlice";
import edwProductReducer from "./features/eduwork/edwProductSlice";
import edwCategoryReducer from "./features/eduwork/edwCategorySlice";
import edwTagReducer from "./features/eduwork/edwTagSlice";

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
    mysV4Auth: mysV4AuthReducer,
    mysV4Product: mysV4ProductReducer,
    mysV4User: mysV4UserReducer,
    mysV5Product: mysV5ProductReducer,
    mysV5User: mysV5UserReducer,
    mysV5Auth: mysV5AuthReducer,
    dgV2User: dgV2UserReducer,
    dgV2Note: dgV2NoteReducer,
    dgV2Employee: dgV2EmployeeReducer,
    dgV2Auth: dgV2AuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [dgApiSlice.reducerPath]: dgApiSlice.reducer,
    edwProduct: edwProductReducer,
    edwCategory: edwCategoryReducer,
    edwTag: edwTagReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware, dgApiSlice.middleware]),
  devTools: true,
});

// store.dispatch(productApiSlice.endpoints.getProducts.initiate());
// store.dispatch(dgV2UsersApiSlice.endpoints.getUsers.initiate());
