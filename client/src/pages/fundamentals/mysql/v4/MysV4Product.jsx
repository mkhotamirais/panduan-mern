import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setSort, setView } from "../../../../app/features/mysql/mysV4ProductSlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import MysV4ProductCard from "./MysV4ProductCard";
import MysV4ProductTable from "./MysV4ProductTable";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/Tags";

const MysV4Product = () => {
  const dispatch = useDispatch();
  const { data: products, status, error, sort, view } = useSelector((state) => state.mysV4Product);
  const { token } = useSelector((state) => state.mysV4Auth);

  useEffect(() => {
    if (token) {
      dispatch(getProducts(token));
    }
  }, [dispatch, token]);
  useEffect(() => {
    console.log(products.length);
  }, [products]);

  let sortedData;
  if (sort === "asc") sortedData = products?.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  else if (sort === "desc") sortedData = products?.slice().sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
  else if (sort === "createdAt") sortedData = products?.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  else if (sort === "updatedAt") sortedData = products?.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed")
    content = (
      <Err>
        {error}{" "}
        <Link to="/mysql/mys-v4-signin" className="text-blue-500">
          signin
        </Link>
      </Err>
    );
  else if (status === "succeeded") {
    if (products.length > 0) {
      const renderedProductsCard = products && sortedData?.map((item) => <MysV4ProductCard key={item?.id} item={item} />);
      const renderedProductsTable =
        products && sortedData?.map((item, i) => <MysV4ProductTable key={item?.id} item={item} i={i} />);
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
                <th className="hidden md:table-cell">Author</th>
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
  } else
    content = (
      <div>
        anda tidak login{" "}
        <Button>
          <Link to="/mysql/mys-v4-signin">signin</Link>
        </Button>
      </div>
    );

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
              localStorage.setItem("mysV4ProductView", JSON.stringify(e.target.value));
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

export default MysV4Product;
