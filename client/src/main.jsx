import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Freecodecamp from "./pages/merns/freecodecamp/Freecodecamp.jsx";
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
import axios from "axios";
import HomeLayout from "./pages/HomeLayout.jsx";
import Home from "./pages/Home.jsx";
import MongodbLayout from "./pages/fundamentals/mongodb/MongodbLayout.jsx";
import Mongodb from "./pages/fundamentals/mongodb/Mongodb.jsx";
import MdV1Product from "./pages/fundamentals/mongodb/v1/MdV1Product.jsx";
import MdV1ProductPost from "./pages/fundamentals/mongodb/v1/MdV1ProductPost.jsx";
import MdV1ProductDetail from "./pages/fundamentals/mongodb/v1/MdV1ProductDetail.jsx";
import MdV1ProductUpdate from "./pages/fundamentals/mongodb/v1/MdV1ProductUpdate.jsx";
import MdV2Product from "./pages/fundamentals/mongodb/v2/MdV2Product.jsx";
import MdV2ProductDetail from "./pages/fundamentals/mongodb/v2/MdV2ProductDetail.jsx";
import MdV2Category from "./pages/fundamentals/mongodb/v2/MdV2Category.jsx";
import MdV2CategoryDetail from "./pages/fundamentals/mongodb/v2/MdV2CategoryDetail.jsx";
import MdV2CategoryPost from "./pages/fundamentals/mongodb/v2/MdV2CategoryPost.jsx";
import MdV2CategoryUpdate from "./pages/fundamentals/mongodb/v2/MdV2CategoryUpdate.jsx";
import MdV2ProductPost from "./pages/fundamentals/mongodb/v2/MdV2ProductPost.jsx";
import MdV2ProductUpdate from "./pages/fundamentals/mongodb/v2/MdV2ProductUpdate.jsx";
import MdV3Product from "./pages/fundamentals/mongodb/v3/MdV3Product.jsx";
import MdV3ProductDetail from "./pages/fundamentals/mongodb/v3/MdV3ProductDetail.jsx";
import MdV3ProductPost from "./pages/fundamentals/mongodb/v3/MdV3ProductPost.jsx";
import MdV3ProductUpdate from "./pages/fundamentals/mongodb/v3/MdV3ProductUpdate.jsx";
import NnLayout from "./pages/merns/netninja/NnLayout.jsx";
import NnHome from "./pages/merns/netninja/NnHome.jsx";
import NnWorkout from "./pages/merns/netninja/workout/NnWorkout.jsx";
import NnWorkoutPost from "./pages/merns/netninja/workout/NnWorkoutPost.jsx";
import NnV1Signin from "./pages/merns/netninja/auth/NnV1Signin.jsx";
import NnV1Signup from "./pages/merns/netninja/auth/NnV1Signup.jsx";
import MysqlLayout from "./pages/fundamentals/mysql/MysqlLayout.jsx";
import Mysql from "./pages/fundamentals/mysql/Mysql.jsx";
import MysV1Product from "./pages/fundamentals/mysql/v1/MysV1Product.jsx";
import MysV2Product from "./pages/fundamentals/mysql/v2/MysV2Product.jsx";
import MysV3Product from "./pages/fundamentals/mysql/v3/MysV3Product.jsx";
import MysV1ProductPost from "./pages/fundamentals/mysql/v1/MysV1ProductPost.jsx";
import MysV1ProductDetail from "./pages/fundamentals/mysql/v1/MysV1ProductDetail.jsx";
import MysV1ProductUpdate from "./pages/fundamentals/mysql/v1/MysV1ProductUpdate.jsx";
import MysV2User from "./pages/fundamentals/mysql/v2/MysV2User.jsx";
import MysV2ProductPost from "./pages/fundamentals/mysql/v2/MysV2ProductPost.jsx";
import MysV2ProductDetail from "./pages/fundamentals/mysql/v2/MysV2ProductDetail.jsx";
import MysV2ProductUpdate from "./pages/fundamentals/mysql/v2/MysV2ProductUpdate.jsx";
import MysV2UserPost from "./pages/fundamentals/mysql/v2/MysV2UserPost.jsx";
import MysV2UserDetail from "./pages/fundamentals/mysql/v2/MysV2UserDetail.jsx";
import MysV2UserUpdate from "./pages/fundamentals/mysql/v2/MysV2UserUpdate.jsx";
import MysV3ProductPost from "./pages/fundamentals/mysql/v3/MysV3ProductPost.jsx";
import MysV3ProductDetail from "./pages/fundamentals/mysql/v3/MysV3ProductDetail.jsx";
import MysV3ProductUpdate from "./pages/fundamentals/mysql/v3/MysV3ProductUpdate.jsx";
import MysV5Product from "./pages/fundamentals/mysql/v5/MysV5Product.jsx";
import MysV5ProductPost from "./pages/fundamentals/mysql/v5/MysV5ProductPost.jsx";
import MysV5ProductDetail from "./pages/fundamentals/mysql/v5/MysV5ProductDetail.jsx";
import MysV5ProductUpdate from "./pages/fundamentals/mysql/v5/MysV5ProductUpdate.jsx";
import MysV5User from "./pages/fundamentals/mysql/v5/MysV5User.jsx";
// import MysV5UserPost from "./pages/fundamentals/mysql/v5/MysV5UserPost.jsx";
import MysV5UserDetail from "./pages/fundamentals/mysql/v5/MysV5UserDetail.jsx";
import MysV5UserUpdate from "./pages/fundamentals/mysql/v5/MysV5UserUpdate.jsx";
import MysV5Signin from "./pages/fundamentals/mysql/v5/MysV5Signin.jsx";
import MysV5Signup from "./pages/fundamentals/mysql/v5/MysV5Signup.jsx";
import MysV4Product from "./pages/fundamentals/mysql/v4/MysV4Product.jsx";
import MysV4ProductPost from "./pages/fundamentals/mysql/v4/MysV4ProductPost.jsx";
import MysV4ProductDetail from "./pages/fundamentals/mysql/v4/MysV4ProductDetail.jsx";
import MysV4ProductUpdate from "./pages/fundamentals/mysql/v4/MysV4ProductUpdate.jsx";
import MysV4User from "./pages/fundamentals/mysql/v4/MysV4User.jsx";
import MysV4UserDetail from "./pages/fundamentals/mysql/v4/MysV4UserDetail.jsx";
import MysV4UserUpdate from "./pages/fundamentals/mysql/v4/MysV4UserUpdate.jsx";
import MysV4Signin from "./pages/fundamentals/mysql/v4/MysV4Signin.jsx";
import MysV4Signup from "./pages/fundamentals/mysql/v4/MysV4Signup.jsx";
import DgLayout from "./pages/merns/davegray/DgLayout.jsx";
import DgHome from "./pages/merns/davegray/DgHome.jsx";
import DgV2Note from "./pages/merns/davegray/note/DgV2Note.jsx";
import DgV2Employee from "./pages/merns/davegray/employee/DgV2Employee.jsx";
import DgV2User from "./pages/merns/davegray/user/DgV2User.jsx";
import DgV2Signin from "./pages/merns/davegray/auth/DgV2Signin.jsx";
import DgV2Signup from "./pages/merns/davegray/auth/DgV2Signup.jsx";
import DgV2UserUpdate from "./pages/merns/davegray/user/DgV2UserUpdate.jsx";
import Prefecth from "./pages/merns/davegray/Prefecth.jsx";
import EdwLayout from "./pages/merns/eduwork/EdwLayout.jsx";
import EdwHome from "./pages/merns/eduwork/EdwHome.jsx";
import EdwProduct from "./pages/merns/eduwork/product/EdwProduct.jsx";
import EdwCategory from "./pages/merns/eduwork/category/EdwCategory.jsx";
import EdwTag from "./pages/merns/eduwork/tag/EdwTag.jsx";
import EdwProductDetail from "./pages/merns/eduwork/product/EdwProductDetail.jsx";
import EdwProductPost from "./pages/merns/eduwork/product/EdwProductPost.jsx";
import EdwProductUpdate from "./pages/merns/eduwork/product/EdwProductUpdate.jsx";

axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          {/* basic */}
          <Route path="freecodecamp" element={<Freecodecamp />}>
            <Route index element={<FccHome />} />
            <Route path="book">
              <Route index element={<FccBook />} />
              <Route path="post" element={<FccBookPost />} />
              <Route path="detail/:id" element={<FccBookDetail />} />
              <Route path="update/:id" element={<FccBookUpdate />} />
            </Route>
          </Route>
          {/* auth */}
          <Route path="netninja" element={<NnLayout />}>
            <Route index element={<NnHome />} />
            <Route
              path="nn-v1-workout"
              loader={() => {
                const user = JSON.parse(localStorage.getItem("nnV1User"));
                if (!user) {
                  alert(`Silahkan signin dahulu`);
                  throw redirect("/netninja/nn-v1-signin");
                }
                return { user };
              }}
            >
              <Route index element={<NnWorkout />} />
              <Route path="post" element={<NnWorkoutPost />} />
            </Route>
            <Route path="nn-v1-signin" element={<NnV1Signin />} />
            <Route path="nn-v1-signup" element={<NnV1Signup />} />
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
          <Route path="davegray" element={<DgLayout />}>
            <Route index element={<DgHome />} />
            <Route element={<Prefecth />}>
              <Route path="dg-v2-note">
                <Route index element={<DgV2Note />} />
              </Route>
              <Route path="dg-v2-employee">
                <Route index element={<DgV2Employee />} />
              </Route>
              <Route path="dg-v2-user">
                <Route index element={<DgV2User />} />
                <Route path="update/:id" element={<DgV2UserUpdate />} />
              </Route>
            </Route>
            <Route path="dg-v2-signin" element={<DgV2Signin />} />
            <Route path="dg-v2-signup" element={<DgV2Signup />} />
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
          <Route path="eduwork" element={<EdwLayout />}>
            <Route index element={<EdwHome />} />
            <Route path="edw-product">
              <Route index element={<EdwProduct />} />
              <Route path="detail/:id" element={<EdwProductDetail />} />
              <Route path="post" element={<EdwProductPost />} />
              <Route path="update/:id" element={<EdwProductUpdate />} />
            </Route>
            <Route path="edw-category">
              <Route index element={<EdwCategory />} />
            </Route>
            <Route path="edw-tag">
              <Route index element={<EdwTag />} />
            </Route>
          </Route>
          <Route path="mongodb" element={<MongodbLayout />}>
            <Route index element={<Mongodb />} />
            <Route path="md-v1-product">
              <Route index element={<MdV1Product />} />
              <Route path="post" element={<MdV1ProductPost />} />
              <Route path="detail/:id" element={<MdV1ProductDetail />} />
              <Route path="update/:id" element={<MdV1ProductUpdate />} />
            </Route>
            <Route path="md-v2-product">
              <Route index element={<MdV2Product />} />
              <Route path="post" element={<MdV2ProductPost />} />
              <Route path="detail/:id" element={<MdV2ProductDetail />} />
              <Route path="update/:id" element={<MdV2ProductUpdate />} />
            </Route>
            <Route path="md-v2-category">
              <Route index element={<MdV2Category />} />
              <Route path="post" element={<MdV2CategoryPost />} />
              <Route path="detail/:id" element={<MdV2CategoryDetail />} />
              <Route path="update/:id" element={<MdV2CategoryUpdate />} />
            </Route>
            <Route path="md-v3-product">
              <Route index element={<MdV3Product />} />
              <Route path="post" element={<MdV3ProductPost />} />
              <Route path="detail/:id" element={<MdV3ProductDetail />} />
              <Route path="update/:id" element={<MdV3ProductUpdate />} />
            </Route>
          </Route>
          <Route path="mysql" element={<MysqlLayout />}>
            <Route index element={<Mysql />} />
            <Route path="mys-v1-product">
              <Route index element={<MysV1Product />} />
              <Route path="post" element={<MysV1ProductPost />} />
              <Route path="detail/:id" element={<MysV1ProductDetail />} />
              <Route path="update/:id" element={<MysV1ProductUpdate />} />
            </Route>
            <Route path="mys-v2-product">
              <Route index element={<MysV2Product />} />
              <Route path="post" element={<MysV2ProductPost />} />
              <Route path="detail/:id" element={<MysV2ProductDetail />} />
              <Route path="update/:id" element={<MysV2ProductUpdate />} />
            </Route>
            <Route path="mys-v2-user">
              <Route index element={<MysV2User />} />
              <Route path="post" element={<MysV2UserPost />} />
              <Route path="detail/:id" element={<MysV2UserDetail />} />
              <Route path="update/:id" element={<MysV2UserUpdate />} />
            </Route>
            <Route path="mys-v3-product">
              <Route index element={<MysV3Product />} />
              <Route path="post" element={<MysV3ProductPost />} />
              <Route path="detail/:id" element={<MysV3ProductDetail />} />
              <Route path="update/:id" element={<MysV3ProductUpdate />} />
            </Route>
            <Route path="mys-v4-product">
              <Route index element={<MysV4Product />} />
              <Route path="post" element={<MysV4ProductPost />} />
              <Route path="detail/:id" element={<MysV4ProductDetail />} />
              <Route path="update/:id" element={<MysV4ProductUpdate />} />
            </Route>
            <Route path="mys-v4-user">
              <Route index element={<MysV4User />} />
              {/* <Route path="post" element={<MysV4UserPost />} /> */}
              <Route path="detail/:id" element={<MysV4UserDetail />} />
              <Route path="update/:id" element={<MysV4UserUpdate />} />
            </Route>
            <Route path="mys-v4-signin" element={<MysV4Signin />} />
            <Route path="mys-v4-signup" element={<MysV4Signup />} />
            <Route path="mys-v5-product">
              <Route index element={<MysV5Product />} />
              <Route path="post" element={<MysV5ProductPost />} />
              <Route path="detail/:id" element={<MysV5ProductDetail />} />
              <Route path="update/:id" element={<MysV5ProductUpdate />} />
            </Route>
            <Route path="mys-v5-user">
              <Route index element={<MysV5User />} />
              {/* <Route path="post" element={<MysV5UserPost />} /> */}
              <Route path="detail/:id" element={<MysV5UserDetail />} />
              <Route path="update/:id" element={<MysV5UserUpdate />} />
            </Route>
            <Route path="mys-v5-signin" element={<MysV5Signin />} />
            <Route path="mys-v5-signup" element={<MysV5Signup />} />
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
