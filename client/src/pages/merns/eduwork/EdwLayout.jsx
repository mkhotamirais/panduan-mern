import { Link, Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { H1 } from "../../../components/Tags";
import { FaCartShopping, FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { signout } from "../../../app/features/eduwork/edwAuthSlice";
import { enqueueSnackbar } from "notistack";

const menus = ["home", "edw product", "edw category", "edw tag", "edw user"];

const EdwLayout = () => {
  const { cred: user } = useSelector((state) => state.edwAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user?.signed) {
      dispatch(signout(user?.signed))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res?.message, { variant: "success" });
          navigate("/eduwork/edw-product");
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };
  return (
    <section id="msa">
      <H1>eduwork</H1>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <Menus menus={menus} />
        <div className="ml-3 inline-block">
          {!user && (
            <Link to="/eduwork/edw-signin" className="text-green-700 hover:opacity-70">
              <FaRightToBracket />
            </Link>
          )}
          {user && (
            <button onClick={handleLogout}>
              <FaRightFromBracket />
            </button>
          )}
        </div>
      </div>
      {user && (
        <div className="flex justify-between my-2">
          <div>halo {user?.user?.fullName}</div>
          <div className="flex gap-3">
            <Link to="edw-cart">
              <FaCartShopping />
            </Link>
            <Link to="edw-account">
              <FaUser />
            </Link>
          </div>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default EdwLayout;
