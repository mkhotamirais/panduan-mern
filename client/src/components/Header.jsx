import Logo from "./Logo";
import { SiGithub } from "react-icons/si";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setOpenSidebar } from "../app/features/collapseSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="z-50 h-16 border-b px-3 lg:px-16 sticky top-0 backdrop-blur bg-white bg-opacity-70">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex gap-3">
          <button onClick={() => dispatch(setOpenSidebar())}>
            <FaBars className="block sm:hidden text-xl text-gray-600" />
          </button>
          <Logo />
        </div>
        <div>
          <a href="https://github.com/mkhotamirais/panduan-mern" className="text-xl">
            <SiGithub className="hover:scale-110 transition-all duration-100" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
