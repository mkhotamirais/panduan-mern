import { Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";

const menus = ["home", "md v1 product", "md v2 product", "md v2 category", "md v3 product", "md v4 product", "md v4 users"];

const MongodbLayout = () => {
  return (
    <section id="msa">
      <H1>mongodb</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default MongodbLayout;
