import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layouts = ({ menus }) => {
  const [active, setActive] = useState(0);
  return (
    <>
      <nav className="border-b h-10 flex items-center gap-3 sticky top-16 bg-white z-40">
        {menus.map((menu, i) => (
          <NavLink
            key={i}
            to={menu.to}
            onClick={() => setActive(i)}
            className={`${active === i ? "opacity-50" : null} capitalize hover:opacity-50`}
          >
            {menu.text}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
};
Layouts.propTypes;

export default Layouts;
