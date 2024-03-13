import { FaExternalLinkAlt, FaYoutube } from "react-icons/fa";

const FccHome = () => {
  return (
    <div>
      <h2 className="text-gray-700 font-medium my-2">Referensi</h2>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/watch?v=-42K44A1oMA"
        className="border border-blue-500 rounded-md hover:bg-blue-600 text-blue-600 hover:text-white p-1 px-4 inline-flex items-center gap-1 capitalize transition-all duration-150"
      >
        <FaYoutube />
        <div>youtube </div>
        <sup>
          <FaExternalLinkAlt className="text-[0.6rem]" />
        </sup>{" "}
      </a>
    </div>
  );
};

export default FccHome;
