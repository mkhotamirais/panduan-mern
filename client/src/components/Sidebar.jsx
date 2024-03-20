import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../app/features/collapseSlice";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const basicList = ["freecodecamp", "redux thunk", "redux rtk"];
const filesList = ["enam", "tujuh", "delapan"];
const authList = ["netninja", "davegray", "eduwork"];
const fundamentalList = ["mongodb", "mysql"];

export const SidebarContentList = ({ title, data }) => {
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setActive(pathArr[1]);
  }, [pathArr]);
  return (
    <div className="flex flex-col items-start mt-3">
      <h3 className="font-medium mb-1">{title}</h3>
      {data.map((sl, i) => (
        <Link
          onClick={() => {
            setActive(i);
            dispatch(setOpenSidebar());
          }}
          key={sl}
          to={sl.split(" ").join("-")}
          className={`${active === sl?.split(" ").join("-") ? "text-blue-600" : ""} pb-1 text-sm hover:text-blue-500`}
        >
          {sl}
        </Link>
      ))}
    </div>
  );
};
SidebarContentList.propTypes;

export const SidebarContent = () => {
  return (
    <section>
      <h2 className="my-4 py-1 rounded border-b text-center font-medium">Projct List</h2>
      <SidebarContentList title="Basic" data={basicList} />
      <SidebarContentList title="Files" data={filesList} />
      <SidebarContentList title="Auth" data={authList} />
      <SidebarContentList title="Fundamental" data={fundamentalList} />
    </section>
  );
};

export const SidebarCollapse = ({ children }) => {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.collapse);
  return (
    <div
      onClick={() => dispatch(setOpenSidebar())}
      className={`block sm:hidden ${
        openSidebar ? "opacity-100 visible" : "opacity-0 invisible"
      } z-50 fixed top-0 left-0 right-0 bottom-0 backdrop-blur transition-all duration-300`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } w-60 h-full bg-white border-r rounded-r-md transition-all duration-300 overflow-y-scroll`}
      >
        <div className="flex justify-between items-center p-3">
          <button onClick={() => dispatch(setOpenSidebar())} className="">
            <FaTimes className="hover:text-red-500 text-gray-600 text-xl" />
          </button>
          <Logo className={"self-center"} />
          <div></div>
        </div>
        <div className="m-2 p-2">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
SidebarCollapse.propTypes;

export const Sidebar = ({ children, className }) => {
  return <div className={`${className} sticky top-16 hidden sm:block`}>{children}</div>;
};
Sidebar.propTypes;
