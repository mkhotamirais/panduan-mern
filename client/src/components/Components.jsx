import { useEffect, useState } from "react";
import { FaChevronRight, FaEdit, FaExclamationCircle, FaEye, FaHome, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

export const Loading = () => (
  <div className="flex justify-center mt-12">
    <PiSpinner className="text-2xl animate-spin" />
  </div>
);

export const Err = ({ children }) => (
  <div className="flex flex-col items-center gap-3 justify-center mt-12">
    <div className="text-rose-500 italic">{children}</div>
    <Prev />
  </div>
);
Err.propTypes;

export const Prev = ({ className }) => (
  <Link to={-1} className={`${className} text-sm inline-block hover:text-blue-600`}>
    <FaArrowLeft />
  </Link>
);
Prev.propTypes;

export const Next = ({ className }) => {
  return (
    <Link to={1} className={`${className} text-sm inline-block hover:text-blue-600`}>
      <FaArrowRight />
    </Link>
  );
};
Next.propTypes;

export const H1 = ({ children = "H1", className }) => (
  <div className={`${className} text-xl font-medium capitalize mb-2`}>{children}</div>
);
H1.propTypes;

export const Breadcrumb = ({ className }) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  path[0] = <FaHome className="inline-block" />;

  //   useEffect(() => {
  //     console.log(navigate(-1));
  //   }, []);

  let content;
  content = path.map((p, i) => {
    let to;
    if (i === 0) to = "..";
    else if (p === "detail" || p === "update") to = "#";
    else
      to = location.pathname
        .split("/")
        .splice(2, path.indexOf(p) - 1)
        .join("/");
    return (
      <Link to={to} key={p} className="hover:underline hover:opacity-70">
        {p}
        {i !== path.length - 1 ? <FaChevronRight className="inline-block text-xs mx-1 sm:mx-2 text-gray-400" /> : null}
      </Link>
    );
  });

  return (
    <div
      className={`${className} text-sm sm:text-base text-gray-700 flex items-center my-2 bg-blue-50 bg-opacity-50 py-2 px-1 rounded border-b border-blue-400`}
    >
      <div className="flex mr-5 gap-3 items-center">
        <Prev />
        <Next />
      </div>
      <div className="leading-none">{content}</div>
    </div>
  );
};

Breadcrumb.propTypes;

export const GridCard = ({ children = "GridCard", className }) => (
  <div className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2`}>
    {children}
  </div>
);
GridCard.propTypes;

export const Menus = ({ menus }) => {
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const [active, setActive] = useState(null);
  if (pathArr[2] === undefined) pathArr[2] = "home";
  useEffect(() => {
    setActive(pathArr[2]);
  }, [pathArr]);
  return (
    <div className="flex gap-2 py-1 mb-2 text-gray-700">
      {menus.map((m) => (
        <Link
          onClick={() => setActive(m)}
          key={m}
          to={m === "home" ? "" : m}
          className={`${
            active === m ? "bg-blue-600 text-white" : "bg-gray-100"
          } hover:opacity-70 capitalize p-2 rounded leading-none`}
        >
          {m}
        </Link>
      ))}
    </div>
  );
};
Menus.propTypes;

export const PostBtn = ({ className }) => (
  <div className={`${className}`}>
    <Link
      to="post"
      className="flex items-center justify-center my-2 text-white w-6 h-6 bg-blue-500 rounded-full hover:opacity-80"
    >
      <FaPlus className="text-sm" />
    </Link>
  </div>
);
PostBtn.propTypes;

export const Actions = ({ className, modalView, modalDelete, id }) => {
  return (
    <div className={`${className} flex w-full border border-blue-300 rounded-lg justify-around p-2`}>
      <button onClick={modalView} className="text-blue-500 hover:opacity-70">
        <FaEye />
      </button>
      <Link to={`detail/${id}`} className="text-yellow-500 hover:opacity-70">
        <FaExclamationCircle />
      </Link>
      <Link to={`update/${id}`} className="text-green-500 hover:opacity-70">
        <FaEdit />
      </Link>
      <button onClick={modalDelete} className="text-red-500 hover:opacity-70">
        <FaTrash />
      </button>
    </div>
  );
};
Actions.propTypes;

export const TimeAgo = ({ time, className }) => {
  let timeAgo = "";
  if (time) {
    const date = parseISO(time);
    const period = formatDistanceToNow(date);
    timeAgo = `${period} ago`;
  }
  return <span className={`${className} text-sm`}>{timeAgo}</span>;
};
TimeAgo.propTypes;

export const Modal = ({ onClose, children, id }) => {
  return (
    <div
      onClick={onClose}
      className="bg-black bg-opacity-30 fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:w-3/4 md:w-1/2 xl:w-1/3 mx-3 border rounded-lg p-4 relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-xl hover:text-red-500 transition-all duration-200">
          <FaTimes />
        </button>
        <div className="text-xs text-left text-gray-500 mr-8 mb-3">ID: {id}</div>
        {children}
      </div>
    </div>
  );
};
Modal.propTypes;
