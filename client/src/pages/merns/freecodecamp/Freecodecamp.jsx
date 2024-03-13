import { Breadcrumb, H1, Menus } from "../../../components/Components";
import { Outlet } from "react-router-dom";

const menus = ["home", "book"];

const Freecodecamp = () => {
  return (
    <section>
      <H1>Freecodecamp</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Freecodecamp;
