import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import Freecodecamp from "./pages/merns/freecodecamp/Freecodecamp.jsx";
import HomePage from "./pages/merns/HomePage.jsx";
import FccBook from "./pages/merns/freecodecamp/book/FccBook.jsx";
import FccHome from "./pages/merns/freecodecamp/FccHome.jsx";
import FccBookDetail from "./pages/merns/freecodecamp/book/FccBookDetail.jsx";
import FccBookPost from "./pages/merns/freecodecamp/book/FccBookPost.jsx";
import FccBookUpdate from "./pages/merns/freecodecamp/book/FccBookUpdate.jsx";
import ReduxThunk from "./pages/merns/reduxThunk/ReduxThunk.jsx";
import ReduxRtk from "./pages/merns/reduxRtk/ReduxRtk.jsx";
import ReduxThunkHome from "./pages/merns/reduxThunk/ReduxThunkHome.jsx";
import ReduxRtkHome from "./pages/merns/reduxRtk/ReduxRtkHome.jsx";
import ReduxThunkProduct from "./pages/merns/reduxThunk/product/ReduxThunkProduct.jsx";
import ReduxRtkProduct from "./pages/merns/reduxRtk/product/ReduxRtkProduct.jsx";
import ReduxThunkPost from "./pages/merns/reduxThunk/product/ReduxThunkPost.jsx";
import ReduxThunkUpdate from "./pages/merns/reduxThunk/product/ReduxThunkUpdate.jsx";
import ReduxThunkDetail from "./pages/merns/reduxThunk/product/ReduxThunkDetail.jsx";
import ReduxRtkProductPost from "./pages/merns/reduxRtk/product/ReduxRtkProductPost.jsx";
import ReduxRtkProductDetail from "./pages/merns/reduxRtk/product/ReduxRtkProductDetail.jsx";
import ReduxRtkProductUpdate from "./pages/merns/reduxRtk/product/ReduxRtkProductUpdate.jsx";
import MysqlBasic from "./pages/mysqls/mysqlBasic/MysqlBasic.jsx";
import MySBasicHome from "./pages/mysqls/mysqlBasic/MySBasicHome.jsx";
import MysqlFiles from "./pages/mysqls/mysqlFiles/MysqlFiles.jsx";
import MysqlAuth from "./pages/mysqls/mysqlAuth/MysqlAuth.jsx";
import MySFilesHome from "./pages/mysqls/mysqlFiles/MySFilesHome.jsx";
import MySAuthHome from "./pages/mysqls/mysqlAuth/MySAuthHome.jsx";
import MsbProduct from "./pages/mysqls/mysqlBasic/product/MsbProduct.jsx";
import MsaProduct from "./pages/mysqls/mysqlAuth/product/MsaProduct.jsx";
import MsbProductPost from "./pages/mysqls/mysqlBasic/product/MsbProductPost.jsx";
import MsbProductUpdate from "./pages/mysqls/mysqlBasic/product/MsbProductUpdate.jsx";
import MsbProductDetail from "./pages/mysqls/mysqlBasic/product/MsbProductDetail.jsx";
import MysqlRelational from "./pages/mysqls/mysqlRelational/MysqlRelational.jsx";
import MsrHome from "./pages/mysqls/mysqlRelational/MsrHome.jsx";
import MsrProduct from "./pages/mysqls/mysqlRelational/product/MsrProduct.jsx";
import MsrUser from "./pages/mysqls/mysqlRelational/user/MsrUser.jsx";
import MsrProductPost from "./pages/mysqls/mysqlRelational/product/MsrProductPost.jsx";
import MsrUserPost from "./pages/mysqls/mysqlRelational/user/MsrUserPost.jsx";
import MsrUserDetail from "./pages/mysqls/mysqlRelational/user/MsrUserDetail.jsx";
import MsrUserUpdate from "./pages/mysqls/mysqlRelational/user/MsrUserUpdate.jsx";
import MsrProductDetail from "./pages/mysqls/mysqlRelational/product/MsrProductDetail.jsx";
import MsrProductUpdate from "./pages/mysqls/mysqlRelational/product/MsrProductUpdate.jsx";
import MsfUser from "./pages/mysqls/mysqlFiles/product/MsfUser";
import MsfUserPost from "./pages/mysqls/mysqlFiles/product/MsfUserPost.jsx";
import MsfUserDetail from "./pages/mysqls/mysqlFiles/product/MsfUserDetail.jsx";
import MsfUserUpdate from "./pages/mysqls/mysqlFiles/product/MsfUserUpdate.jsx";
import MongodbBasic from "./pages/mongodbs/mongodbBasic/MongodbBasic.jsx";
import MdBasicHome from "./pages/mongodbs/mongodbBasic/MdBasicHome.jsx";
import MongodbFiles from "./pages/mongodbs/mongodbFiles/MongodbFiles.jsx";
import MongodbAuth from "./pages/mongodbs/mongodbAuth/MongodbAuth.jsx";
import MongodbRelational from "./pages/mongodbs/mongodbRelational/MongodbRelational.jsx";
import MdAuthHome from "./pages/mongodbs/mongodbAuth/MdAuthHome.jsx";
import MdRelHome from "./pages/mongodbs/mongodbRelational/MdRelHome.jsx";
import MdFilesHome from "./pages/mongodbs/mongodbFiles/MdFilesHome.jsx";
import MdBasicProduct from "./pages/mongodbs/mongodbBasic/product/MdBasicProduct.jsx";
import MdFilesProduct from "./pages/mongodbs/mongodbFiles/product/MdFilesProduct.jsx";
import MdRelProduct from "./pages/mongodbs/mongodbRelational/product/MdRelProduct.jsx";
import MdAuthProduct from "./pages/mongodbs/mongodbAuth/product/MdAuthProduct.jsx";
import MsaUser from "./pages/mysqls/mysqlAuth/user/MsaUser.jsx";
import MsaUserDetail from "./pages/mysqls/mysqlAuth/user/MsaUserDetail.jsx";
import MsaUserPost from "./pages/mysqls/mysqlAuth/user/MsaUserPost.jsx";
import MsaProductDetail from "./pages/mysqls/mysqlAuth/product/MsaProductDetail.jsx";
import MsaProductPost from "./pages/mysqls/mysqlAuth/product/MsaProductPost.jsx";
import MsaSignin from "./pages/mysqls/mysqlAuth/auth/MsaSignin.jsx";
import MsaSignup from "./pages/mysqls/mysqlAuth/auth/MsaSignup.jsx";
import axios from "axios";

axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="freecodecamp" element={<Freecodecamp />}>
            <Route index element={<FccHome />} />
            <Route path="book">
              <Route index element={<FccBook />} />
              <Route path="post" element={<FccBookPost />} />
              <Route path="detail/:id" element={<FccBookDetail />} />
              <Route path="update/:id" element={<FccBookUpdate />} />
            </Route>
          </Route>
          <Route path="redux-thunk" element={<ReduxThunk />}>
            <Route index element={<ReduxThunkHome />} />
            <Route path="product">
              <Route index element={<ReduxThunkProduct />} />
              <Route path="post" element={<ReduxThunkPost />} />
              <Route path="update/:id" element={<ReduxThunkUpdate />} />
              <Route path="detail/:id" element={<ReduxThunkDetail />} />
            </Route>
          </Route>
          <Route path="redux-rtk" element={<ReduxRtk />}>
            <Route index element={<ReduxRtkHome />} />
            <Route path="product">
              <Route index element={<ReduxRtkProduct />} />
              <Route path="detail/:id" element={<ReduxRtkProductDetail />} />
              <Route path="update/:id" element={<ReduxRtkProductUpdate />} />
              <Route path="post" element={<ReduxRtkProductPost />} />
            </Route>
          </Route>
          <Route path="mysql-basic" element={<MysqlBasic />}>
            <Route index element={<MySBasicHome />} />
            <Route path="product">
              <Route index element={<MsbProduct />} />
              <Route path="post" element={<MsbProductPost />} />
              <Route path="detail/:id" element={<MsbProductDetail />} />
              <Route path="update/:id" element={<MsbProductUpdate />} />
            </Route>
          </Route>
          <Route path="mysql-files" element={<MysqlFiles />}>
            <Route index element={<MySFilesHome />} />
            <Route path="product">
              <Route index element={<MsfUser />} />
              <Route path="post" element={<MsfUserPost />} />
              <Route path="detail/:id" element={<MsfUserDetail />} />
              <Route path="update/:id" element={<MsfUserUpdate />} />
            </Route>
          </Route>
          <Route path="mysql-auth" element={<MysqlAuth />}>
            <Route index element={<MySAuthHome />} />
            <Route path="product">
              <Route index element={<MsaProduct />} />
              <Route path="detail/:id" element={<MsaProductDetail />} />
              <Route path="post" element={<MsaProductPost />} />
            </Route>
            <Route path="user">
              <Route index element={<MsaUser />} />
              <Route path="detail/:id" element={<MsaUserDetail />} />
              <Route path="post" element={<MsaUserPost />} />
            </Route>
            <Route path="signin" element={<MsaSignin />} />
            <Route path="signup" element={<MsaSignup />} />
          </Route>
          <Route path="mysql-relational" element={<MysqlRelational />}>
            <Route index element={<MsrHome />} />
            <Route path="product">
              <Route index element={<MsrProduct />} />
              <Route path="update/:id" element={<MsrProductUpdate />} />
              <Route path="detail/:id" element={<MsrProductDetail />} />
              <Route path="post" element={<MsrProductPost />} />
            </Route>
            <Route path="user">
              <Route index element={<MsrUser />} />
              <Route path="post" element={<MsrUserPost />} />
              <Route path="update/:id" element={<MsrUserUpdate />} />
              <Route path="detail/:id" element={<MsrUserDetail />} />
            </Route>
          </Route>
          <Route path="mongodb-basic" element={<MongodbBasic />}>
            <Route index element={<MdBasicHome />} />
            <Route path="product" element={<MdBasicProduct />} />
          </Route>
          <Route path="mongodb-files" element={<MongodbFiles />}>
            <Route index element={<MdFilesHome />} />
            <Route path="product" element={<MdFilesProduct />} />
          </Route>
          <Route path="mongodb-relational" element={<MongodbRelational />}>
            <Route index element={<MdRelHome />} />
            <Route path="product" element={<MdRelProduct />} />
          </Route>
          <Route path="mongodb-auth" element={<MongodbAuth />}>
            <Route index element={<MdAuthHome />} />
            <Route path="product" element={<MdAuthProduct />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
