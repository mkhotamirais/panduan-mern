import { Link, Outlet } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import useNnV1Signout from "./hooks/useNnV1Signout";
import useNnV1AuthContext from "./hooks/useNnV1AuthContext";

const menus = ["home", "nn v1 workout"];

const NnLayout = () => {
  const { signout } = useNnV1Signout();
  const { user } = useNnV1AuthContext();

  return (
    <section id="msa">
      <H1>netninja</H1>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <Menus menus={menus} />
        <div>
          {!user && (
            <Link to="/netninja/nn-v1-signin" className="text-green-700 hover:opacity-70">
              <FaRightToBracket />
            </Link>
          )}
          {user && (
            <button onClick={signout}>
              <FaRightFromBracket />
            </button>
          )}
        </div>
      </div>
      <div>halo {user?.user?.email}</div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default NnLayout;
