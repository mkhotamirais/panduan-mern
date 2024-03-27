import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import EdwUserModalDelete from "./EdwUserModalDelete";
import EdwUserModalView from "./EdwUserModalView";

const EdwUserCard = ({ item }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2">
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div>{item?.fullName}</div>
      <div>{item?.email}</div>
      <div>{item?.role}</div>
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
      {showModalDelete === item?._id && <EdwUserModalDelete onClose={onClose} item={item} />}
      {showModalView === item?._id && <EdwUserModalView onClose={onClose} item={item} />}
    </div>
  );
};
EdwUserCard.propTypes;

export default EdwUserCard;
