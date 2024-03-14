import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setSort, setView } from "../../../../app/features/mysqlBasic/mysqlBasicSlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import MsbProductCard from "./MsbProductCard";
import MsbProductTable from "./MsbProductTable";

const MsbProduct = () => {
  const { data: products, status, error, view, sort } = useSelector((state) => state.mysqlBasic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let sortedData;
  if (sort === "asc") sortedData = products?.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  else if (sort === "desc") sortedData = products?.slice().sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
  else if (sort === "createdAt") sortedData = products?.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  else if (sort === "updatedAt") sortedData = products?.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    if (products.length > 0) {
      const renderedProductsCard = products && sortedData?.map((item) => <MsbProductCard key={item.id} item={item} />);
      const renderedProductsTable =
        products && sortedData?.map((item, i) => <MsbProductTable key={item.id} item={item} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedProductsCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className="hidden sm:table-cell">Price</th>
                <th className="hidden lg:table-cell">CreatedAt</th>
                <th className="hidden xl:table-cell">UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedProductsTable}</tbody>
          </table>
        );
      }
    } else if (products.length == 0) content = <div className="flex justify-center mt-5 italic">no content</div>;
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
              localStorage.setItem("mysqlBasicView", JSON.stringify(e.target.value));
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

export default MsbProduct;
