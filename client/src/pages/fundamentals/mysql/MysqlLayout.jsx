import { Link, Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Menus } from "../../../components/Components";
import { Button, H1 } from "../../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { me, reset, signout } from "../../../app/features/mysql/mysV5AuthSlice";
import { useEffect } from "react";

const menus = ["home", "mys v1 product", "mys v2 product", "mys v2 user", "mys v3 product", "mys v5 product", "mys v5 user"];

const MysqlLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: v5user } = useSelector((state) => state.mysV5Auth);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  const v5signout = () => {
    dispatch(signout());
    dispatch(reset());
    navigate("/mysql");
  };

  return (
    <section id="msa">
      <H1>mysql</H1>
      <Breadcrumb />
      <Menus menus={menus} />
      <div className="flex items-center gap-2">
        <div>V5:</div>
        {v5user ? (
          <Button onClick={v5signout}>v5 signout</Button>
        ) : (
          <Link to="/mysql/mys-v5-signin">
            <Button>v5 signin</Button>
          </Link>
        )}
        <div>halo {v5user?.name}</div>
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default MysqlLayout;
