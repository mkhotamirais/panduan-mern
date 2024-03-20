import { useDispatch, useSelector } from "react-redux";
import { useGetNotesQuery } from "../../../../app/api/dgApiEndpoint/dgV2NotesApiSlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../components/Components";
import DgV2NoteCard from "./DgV2NoteCard";
import DgV2NoteTable from "./DgV2NoteTable";
import { setSort, setView } from "../../../../app/features/davegray/dgV2NoteSlice";

const DgV2Note = () => {
  const { data: notes, isLoading, isSuccess, isError, error } = useGetNotesQuery();
  const { view } = useSelector((state) => state.dgV2Note);
  const dispatch = useDispatch();

  // let sortedData;
  // if (sort === "asc") sortedData = notes?.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  // else if (sort === "desc") sortedData = notes?.slice().sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
  // else if (sort === "createdAt") sortedData = notes?.slice().sort((a, b) => b?.createdAt?.localeCompare(a.createdAt));
  // else if (sort === "updatedAt") sortedData = notes?.slice().sort((a, b) => b?.updatedAt?.localeCompare(a.updatedAt));

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const { ids } = notes;
    if (ids?.length > 0) {
      const renderedNotesCard = ids.map((id) => <DgV2NoteCard key={id} id={id} />);
      const renderedNotesTable = ids.map((id, i) => <DgV2NoteTable key={id} id={id} i={i} />);
      if (view === "card") {
        content = <GridCard>{renderedNotesCard}</GridCard>;
      } else if (view === "table") {
        content = (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className="hidden sm:table-cell">Roles</th>
                <th className="hidden lg:table-cell">CreatedAt</th>
                <th className="hidden xl:table-cell">UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderedNotesTable}</tbody>
          </table>
        );
      }
    } else if (notes.length == 0) content = <div className="flex justify-center mt-5 italic">no content</div>;
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
              localStorage.setItem("dgV2NoteView", JSON.stringify(e.target.value));
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

export default DgV2Note;
