import { useDispatch, useSelector } from "react-redux";
import FccBookCard from "./FccBookCard";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import { setSort } from "../../../../app/features/freecodecamp/v1FccBookSlice";
import { useEffect, useState } from "react";
import FccBookTable from "./FccBookTable";

const FccBook = () => {
  const { data: books, status, error, sort } = useSelector((state) => state.v1FccBook);
  const dispatch = useDispatch();
  const [view, setView] = useState("table");

  let sortedData;
  if (sort === "asc") sortedData = books.slice().sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
  else if (sort === "desc") sortedData = books.slice().sort((a, b) => (a.title > b.title ? -1 : b.title > a.title ? 1 : 0));
  else if (sort === "createdAt") sortedData = books.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  else if (sort === "updatedAt") sortedData = books.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    if (books?.length > 0) {
      const renderedBooksCard = books && sortedData.map((book) => <FccBookCard key={book?._id} book={book} />);
      const renderedBooksTable = books && sortedData.map((book, i) => <FccBookTable key={book?._id} book={book} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedBooksCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th className="hidden sm:table-cell">Author</th>
                <th className="hidden md:table-cell">Publish Year</th>
                <th className="hidden lg:table-cell">CreatedAt</th>
                <th className="hidden xl:table-cell">UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedBooksTable}</tbody>
          </table>
        );
      }
    } else if (books.length == 0) content = <div className="text-center italic mt-5">Data empty</div>;
  }

  useEffect(() => {
    setView(JSON.parse(localStorage.getItem("fccBookView")));
  }, []);

  return (
    <section id="fccBook">
      <div className="flex justify-between my-1 items-center">
        <PostBtn />
        <div className="flex gap-1">
          <select
            name="view"
            id="view"
            onChange={(e) => {
              setView(e.target.value);
              localStorage.setItem("fccBookView", JSON.stringify(e.target.value));
            }}
            className="border border-blue-400 p-1 rounded"
          >
            <option value="table" defaultValue={view === "table"}>
              Table View
            </option>
            <option value="card" defaultValue={view === "card"}>
              Card View
            </option>
          </select>
          <select
            name="sort"
            id="sort"
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="border p-1 border-blue-400 rounded"
          >
            <option value="updatedAt">Sort</option>
            <option value="asc">From a to z</option>
            <option value="desc">From z to a</option>
            <option value="createdAt">Latest create</option>
            <option value="updatedAt">Latest update</option>
          </select>
        </div>
      </div>
      {content}
    </section>
  );
};

export default FccBook;
