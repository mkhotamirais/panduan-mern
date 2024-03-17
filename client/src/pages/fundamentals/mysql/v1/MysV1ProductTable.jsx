import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV1ProductModalDelete from "./MysV1ProductModalDelete";
import MysV1ProductModalView from "./MysV1ProductModalView";

const MysV1ProductTable = ({ item, i }) => {
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
      <td className="hidden sm:table-cell">Rp{item?.price?.toLocaleString("id-ID")}</td>
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
        {showModalDelete === item?.id && <MysV1ProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MysV1ProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MysV1ProductTable.propTypes;

export default MysV1ProductTable;
