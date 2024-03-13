import { Outlet } from "react-router-dom";
import { Breadcrumb, H1, Menus } from "../../../components/Components";

const menus = ["home", "product"];

const ReduxRtk = () => {
  return (
    <section>
      <H1>Redux Rtk</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default ReduxRtk;
