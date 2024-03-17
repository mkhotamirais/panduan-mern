import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSort, setView } from "../../../../app/features/mysql/mysV2UserSlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import MysV2UserCard from "./MysV2UserCard";
import MysV2UserTable from "./MysV2UserTable";

const MysV2User = () => {
  const dispatch = useDispatch();
  const { data: users, status, error, sort, view } = useSelector((state) => state.mysV2User);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  let sortedData;
  if (sort === "asc") sortedData = users?.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  else if (sort === "desc") sortedData = users?.slice().sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
  else if (sort === "createdAt") sortedData = users?.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  else if (sort === "updatedAt") sortedData = users?.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    if (users.length > 0) {
      const renderedUsersCard = users && sortedData?.map((item) => <MysV2UserCard key={item?.id} item={item} />);
      const renderedUsersTable = users && sortedData?.map((item, i) => <MysV2UserTable key={item?.id} item={item} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedUsersCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className="hidden md:table-cell">Age</th>
                <th className="hidden lg:table-cell">CreatedAt</th>
                <th className="hidden xl:table-cell">UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedUsersTable}</tbody>
          </table>
        );
      }
    } else if (users.length == 0) content = <div className="flex justify-center mt-5 italic">no content</div>;
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
              localStorage.setItem("mysV2UserView", JSON.stringify(e.target.value));
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

export default MysV2User;
