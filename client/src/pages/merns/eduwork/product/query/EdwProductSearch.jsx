import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setQuery } from "../../../../../app/features/eduwork/edwProductSlice";

const EdwProductSearch = () => {
  const { query } = useSelector((state) => state.edwProduct);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setQuery({ ...query, q: e.target.cari.value }));
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="border rounded-lg overflow-hidden flex">
        <input
          type="search"
          id="cari"
          name="cari"
          placeholder="cari"
          className="w-full p-2 focus:outline-none text-gray-600"
        />
        <button className="inline-flex items-center justify-center w-auto px-3 bg-blue-500 text-white hover:opacity-80">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default EdwProductSearch;
