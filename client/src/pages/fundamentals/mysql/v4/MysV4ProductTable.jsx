import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV4ProductModalDelete from "./MysV4ProductModalDelete";
import MysV4ProductModalView from "./MysV4ProductModalView";

const MysV4ProductTable = ({ item, i }) => {
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
      <td className="hidden md:table-cell">by {item?.V4User?.name}</td>
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
        {showModalDelete === item?.id && <MysV4ProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MysV4ProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MysV4ProductTable.propTypes;

export default MysV4ProductTable;
