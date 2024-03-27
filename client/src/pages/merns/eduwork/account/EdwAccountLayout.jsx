import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const menus = ["", "pemesanan", "alamat"];

const EdwAccountLayout = () => {
  const [active, setActive] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/");
  useEffect(() => {
    if (!path[3]) path[3] = "";
    setActive(path[3]);
  }, [path]);

  return (
    <section className="border rounded p-3">
      <div>
        <div className="border rounded flex gap-2 p-2 mb-1 text-sm">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu}
              onClick={() => setActive(menu)}
              className={`capitalize ${active === menu ? "text-blue-600" : ""}`}
            >
              {menu === "" ? "account" : menu}
            </Link>
          ))}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default EdwAccountLayout;
