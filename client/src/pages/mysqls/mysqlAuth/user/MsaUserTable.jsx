import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MsaUserModalDelete from "./MsaUserModalDelete";
import MsaUserModalView from "./MsaUserModalView";

const MsaUserTable = ({ item, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item?.email}</td>
      <td className="hidden sm:table-cell">{item?.age}</td>
      <td className="hidden lg:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      <td>
        <Actions
          modalView={() => setShowModalView(item?.id)}
          modalDelete={() => setShowModalDelete(item?.id)}
          id={item?.id}
          className={"border-none"}
        />
        {showModalDelete === item?.id && <MsaUserModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MsaUserModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MsaUserTable.propTypes;

export default MsaUserTable;
