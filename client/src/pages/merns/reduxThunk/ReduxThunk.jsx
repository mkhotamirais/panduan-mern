import { Outlet } from "react-router-dom";
import { Breadcrumb, H1, Menus } from "../../../components/Components";

const menus = ["home", "product"];

const ReduxThunk = () => {
  return (
    <section id="reduxThunk">
      <H1>redux thunk</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default ReduxThunk;
