import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setSort, setView } from "../../../../app/features/mongodb/mdV2CategorySlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import MdV2CategoryCard from "./MdV2CategoryCard";
import MdV2CategoryTable from "./MdV2CategoryTable";

const MdV2Category = () => {
  const dispatch = useDispatch();
  const { data: categories, status, error, sort, view } = useSelector((state) => state.mdV2Category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  let sortedData;
  if (sort === "asc") sortedData = categories?.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  else if (sort === "desc")
    sortedData = categories?.slice().sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
  else if (sort === "createdAt") sortedData = categories?.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  else if (sort === "updatedAt") sortedData = categories?.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    if (categories.length > 0) {
      const renderedCategoriesCard =
        categories && sortedData?.map((item) => <MdV2CategoryCard key={item?._id} item={item} />);
      const renderedCategoriesTable =
        categories && sortedData?.map((item, i) => <MdV2CategoryTable key={item?._id} item={item} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedCategoriesCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className="hidden sm:table-cell">CreatedAt</th>
                <th className="hidden md:table-cell">UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedCategoriesTable}</tbody>
          </table>
        );
      }
    } else if (categories.length == 0) content = <div className="flex justify-center mt-5 italic">no content</div>;
  }

  return (
    <div>
      <div className="flex justify-between my-1 items-center">
        <PostBtn />
        <div className="flex gap-1">
          <select
            name="view"
            id="view"
            value={view}
            onChange={(e) => {
              dispatch(setView(e.target.value));
              localStorage.setItem("mdV2CategoryView", JSON.stringify(e.target.value));
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
      <div>{content}</div>
    </div>
  );
};

export default MdV2Category;
