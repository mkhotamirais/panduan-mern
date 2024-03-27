import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import EdwUserModalDelete from "./EdwUserModalDelete";
import EdwUserModalView from "./EdwUserModalView";

const EdwUserTable = ({ item, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item?.fullName}</td>
      <td className="hidden sm:table-cell">{item?.email}</td>
      <td className="hidden md:table-cell">{item?.role}</td>
      <td className="hidden xl:table-cell">
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
        {showModalDelete === item?._id && <EdwUserModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <EdwUserModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
EdwUserTable.propTypes;

export default EdwUserTable;
