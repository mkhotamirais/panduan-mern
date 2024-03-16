import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MdV2CategoryModalDelete from "./MdV2CategoryModalDelete";
import MdV2CategoryModalView from "./MdV2CategoryModalView";

const MdV2CategoryTable = ({ item, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item?.name}</td>
      <td className="hidden sm:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden md:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      <td>
        <Actions
          modalView={() => setShowModalView(item?._id)}
          modalDelete={() => setShowModalDelete(item?._id)}
          id={item?._id}
          className={"border-none"}
        />
        {showModalDelete === item?._id && <MdV2CategoryModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <MdV2CategoryModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MdV2CategoryTable.propTypes;

export default MdV2CategoryTable;
