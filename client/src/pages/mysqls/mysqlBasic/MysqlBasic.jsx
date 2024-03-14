import { Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";

const menus = ["home", "product"];

const MysqlBasic = () => {
  return (
    <section id="mysqlBasic">
      <H1>mysql basic</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default MysqlBasic;
