import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import DgV2NoteModalDelete from "./DgV2NoteModalDelete";
import DgV2NoteModalView from "./DgV2NoteModalView";
import { useSelector } from "react-redux";
import { selectNoteById } from "../../../../app/api/dgApiEndpoint/dgV2NotesApiSlice";

const DgV2NoteCard = ({ id }) => {
  const item = useSelector((state) => selectNoteById(state, id));
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2">
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div>{item?.title}</div>
      <div>{item?.content}</div>
      <div>By {item?.userId?.username}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <Actions
        modalView={() => setShowModalView(item?._id)}
        modalDelete={() => setShowModalDelete(item?._id)}
        id={item?._id}
      />
      {showModalDelete === item?._id && (
        <DgV2NoteModalDelete onClose={onClose} item={item} setShowModalDelete={setShowModalDelete} />
      )}
      {showModalView === item?._id && <DgV2NoteModalView onClose={onClose} item={item} />}
    </div>
  );
};
DgV2NoteCard.propTypes;

export default DgV2NoteCard;
