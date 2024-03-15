import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthGate from "./AuthGate";

const menus = [
  { to: "", text: "home" },
  { to: "products", text: "product" },
  { to: "users", text: "user" },
];

const Header = () => {
  const [active, setActive] = useState(null);

  return (
    <header className="h-16 border-b px-3 lg:px-16 flex items-center justify-between sticky top-0 backdrop-blur backdrop-saturate-100 bg-[rgba(255,255,255,0.5)]">
      <nav className="flex items-center gap-6">
        <a href="#" className="font-semibold text-xl">
          Logo
        </a>
        <div className="flex gap-3">
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
        </div>
      </nav>
      <nav className="flex gap-3">
        {/* <Link to="/">
          <FaUser />
        </Link>
        <Link to="/">
          <FaMoon />
        </Link>
        <Link to="/logout">
          <FaRightFromBracket />
        </Link> */}
        <AuthGate />
      </nav>
    </header>
  );
};

export default Header;
