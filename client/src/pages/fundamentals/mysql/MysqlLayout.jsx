import { Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";

const menus = ["home", "mys v1 product", "mys v2 product", "mys v2 user"];

const MysqlLayout = () => {
  return (
    <section id="msa">
      <H1>mysql</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default MysqlLayout;
