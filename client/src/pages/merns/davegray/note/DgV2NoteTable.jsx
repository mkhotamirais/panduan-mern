import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import DgV2NoteModalDelete from "./DgV2NoteModalDelete";
import DgV2NoteModalView from "./DgV2NoteModalView";
import { useSelector } from "react-redux";
import { selectNoteById } from "../../../../app/api/dgApiEndpoint/dgV2NotesApiSlice";

const DgV2NoteTable = ({ id, i }) => {
  const item = useSelector((state) => selectNoteById(state, id));
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item?.title}</td>
      <td className="hidden sm:table-cell">{item?.title}</td>
      <td className="hidden lg:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      <td>
        <Actions
          modalView={() => setShowModalView(item?._id)}
          modalDelete={() => setShowModalDelete(item?._id)}
          id={item?._id}
          className={"border-none"}
        />
        {showModalDelete === item?._id && <DgV2NoteModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <DgV2NoteModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
DgV2NoteTable.propTypes;

export default DgV2NoteTable;
