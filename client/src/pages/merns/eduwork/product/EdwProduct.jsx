import { useDispatch, useSelector } from "react-redux";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import EdwProductCard from "./EdwProductCard";
import EdwProductTable from "./EdwProductTable";
import { setSort, setView } from "../../../../app/features/eduwork/edwProductSlice";
import EdwProductSearch from "./query/EdwProductSearch";
import EdwProductCategory from "./query/EdwProductCategory";
import EdwProductTags from "./query/EdwProductTags";
import EdwProductPaginasi from "./query/EdwProductPaginasi";

const EdwProduct = () => {
  const dispatch = useDispatch();
  const { data: products, status, error, sort, view } = useSelector((state) => state.edwProduct);
  const { cred } = useSelector((state) => state.edwAuth);
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
      const renderedProductsCard = products && sortedData?.map((item) => <EdwProductCard key={item?._id} item={item} />);
      const renderedProductsTable =
        products && sortedData?.map((item, i) => <EdwProductTable key={item?._id} item={item} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedProductsCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th className="hidden sm:table-cell">Name</th>
                <th className="hidden md:table-cell">Price</th>
                <th className="hidden lg:table-cell">Tags</th>
                <th className="hidden lg:table-cell">Description</th>
                <th className="hidden xl:table-cell">CreatedAt</th>
                <th className="hidden xl:table-cell">UpdatedAt</th>
                {cred && <th>Action</th>}
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
              localStorage.setItem("edwProductView", JSON.stringify(e.target.value));
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
      <div className="flex gap-2 w-full justify-between">
        <EdwProductSearch />
        <EdwProductCategory />
      </div>
      <div>
        <EdwProductTags />
      </div>
      <div>
        <EdwProductPaginasi />
      </div>
      <div>{content}</div>
    </div>
  );
};

export default EdwProduct;
