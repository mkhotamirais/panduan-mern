import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV2UserModalDelete from "./MysV2UserModalDelete";
import MysV2UserModalView from "./MysV2UserModalView";

const MysV2UserTable = ({ item, i }) => {
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
      <td className="hidden md:table-cell">{item?.age}</td>
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
        {showModalDelete === item?.id && <MysV2UserModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MysV2UserModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MysV2UserTable.propTypes;

export default MysV2UserTable;
