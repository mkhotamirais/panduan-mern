import { useDispatch, useSelector } from "react-redux";
import { useGetEmployeesQuery } from "../../../../app/api/dgApiEndpoint/dgV2EmployeesApiSlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import DgV2EmployeeCard from "./DgV2EmployeeCard";
import DgV2EmployeeTable from "./DgV2EmployeeTable";
import { setSort, setView } from "../../../../app/features/davegray/dgV2EmployeeSlice";
import { useEffect } from "react";

const DgV2Employee = () => {
  const {
    data: employees = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery(undefined, {
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { view } = useSelector((state) => state.dgV2Employee);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("employees", employees);
  //   console.log(isLoading);
  //   console.log(isError);
  //   console.log(error);
  // }, [isLoading, isError, error, employees]);
  // let sortedData;
  // if (sort === "asc") sortedData = employees?.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  // else if (sort === "desc") sortedData = employees?.slice().sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
  // else if (sort === "createdAt") sortedData = employees?.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  // else if (sort === "updatedAt") sortedData = employees?.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const { ids } = employees;
    if (ids?.length > 0) {
      const renderedEmployeesCard = ids?.map((id) => <DgV2EmployeeCard key={id} id={id} />);
      const renderedEmployeesTable = ids?.map((id, i) => <DgV2EmployeeTable key={id} id={id} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedEmployeesCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className="hidden sm:table-cell">Age</th>
                <th className="hidden lg:table-cell">CreatedAt</th>
                <th className="hidden xl:table-cell">UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedEmployeesTable}</tbody>
          </table>
        );
      }
    } else if (employees.length == 0) content = <div className="flex justify-center mt-5 italic">no content</div>;
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
              localStorage.setItem("dgV2EmployeeView", JSON.stringify(e.target.value));
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

export default DgV2Employee;
