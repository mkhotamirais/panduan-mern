import { Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";

const menus = ["home", "product"];

const MysqlFiles = () => {
  return (
    <section id="msf">
      <H1>mysql files</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default MysqlFiles;
