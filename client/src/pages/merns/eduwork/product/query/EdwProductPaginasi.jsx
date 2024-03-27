import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setLimit, setQuery } from "../../../../../app/features/eduwork/edwProductSlice";
import { Select } from "../../../../../components/Tags";

const EdwProductPaginasi = () => {
  const { total, limit, totalCriteria, currentPage, query } = useSelector((state) => state.edwProduct);
  const dispatch = useDispatch();

  //   const firstIndex = currentPage * limit;
  //   const lastIndex = firstIndex - limit;
  const nPage = Math.ceil(totalCriteria / limit);
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

  const handleLimit = (e) => {
    dispatch(setLimit(e.target.value));
  };

  useEffect(() => {
    dispatch(setQuery({ ...query, limit: limit, skip: (currentPage - 1) * limit }));
  }, [dispatch, limit, currentPage]);

  const nextPage = () => (currentPage !== nPage ? dispatch(setCurrentPage(currentPage + 1)) : null);
  const prevPage = () => (currentPage !== 1 ? dispatch(setCurrentPage(currentPage - 1)) : null);

  return (
    <div>
      <div>
        <button disabled={currentPage === 1 && true} onClick={prevPage} className="border px-2 disabled:opacity-50">
          Prev
        </button>
        {pageNumbers.map((num, i) => (
          <button
            onClick={() => dispatch(setCurrentPage(num))}
            key={i}
            className={`border px-2 hover:bg-blue-500 ${currentPage === num ? "bg-blue-500" : ""}`}
          >
            {num}
          </button>
        ))}
        <button disabled={currentPage === nPage && true} onClick={nextPage} className="border px-2 disabled:opacity-50">
          Next
        </button>
      </div>
      <div className="flex justify-between items-center">
        Result {totalCriteria} from {total}
        <div className="flex items-center">
          <label id="limit" className="mr-2">
            Limit
          </label>
          <Select onChange={handleLimit} className={"mb-0"}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default EdwProductPaginasi;
