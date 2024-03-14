import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MsrProductModalDelete from "./MsrProductModalDelete";
import MsrProductModalView from "./MsrProductModalView";

const MsrProductTable = ({ item, i }) => {
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
      <td className="hidden sm:table-cell">{item?.price}</td>
      <td className="hidden md:table-cell">{item?.User?.name}</td>
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
        {showModalDelete === item?.id && <MsrProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MsrProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MsrProductTable.propTypes;

export default MsrProductTable;
