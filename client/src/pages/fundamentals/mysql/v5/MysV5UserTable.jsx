import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV5UserModalDelete from "./MysV5UserModalDelete";
import MysV5UserModalView from "./MysV5UserModalView";

const MysV5UserTable = ({ item, i }) => {
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
      <td className="hidden sm:table-cell">{item?.role}</td>
      <td className="hidden md:table-cell">{item?.email}</td>
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
        {showModalDelete === item?.id && <MysV5UserModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MysV5UserModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MysV5UserTable.propTypes;

export default MysV5UserTable;
