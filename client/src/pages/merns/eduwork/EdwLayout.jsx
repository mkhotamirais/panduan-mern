import { Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";

const menus = ["home", "edw product", "edw category", "edw tag"];

const EdwLayout = () => {
  return (
    <section id="msa">
      <H1>eduwork</H1>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <Menus menus={menus} />
        {/* <div className="ml-3 inline-block">
          {!user && (
            <Link to="/davegray/dg-v2-signin" className="text-green-700 hover:opacity-70">
              <FaRightToBracket />
            </Link>
          )}
          {user && (
            <button onClick={signout}>
              <FaRightFromBracket />
            </button>
          )}
        </div> */}
      </div>
      {/* <div>halo {user?.user?.email}</div> */}
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default EdwLayout;
