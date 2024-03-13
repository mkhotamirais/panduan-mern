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
import { v1FccGetBooks } from "./app/features/freecodecamp/v1FccBookSlice.js";
import HomePage from "./pages/merns/HomePage.jsx";
import FccBook from "./pages/merns/freecodecamp/book/FccBook.jsx";
import FccHome from "./pages/merns/freecodecamp/FccHome.jsx";
import FccBookDetail from "./pages/merns/freecodecamp/book/FccBookDetail.jsx";
import FccBookPost from "./pages/merns/freecodecamp/book/FccBookPost.jsx";
import FccBookUpdate from "./pages/merns/freecodecamp/book/FccBookUpdate.jsx";

store.dispatch(v1FccGetBooks());

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
