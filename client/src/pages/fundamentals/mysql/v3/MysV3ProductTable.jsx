import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV3ProductModalDelete from "./MysV3ProductModalDelete";
import MysV3ProductModalView from "./MysV3ProductModalView";

const MysV3ProductTable = ({ item, i }) => {
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
      <td className="flex justify-center">
        <figure className="w-24 h-24">
          <img src={item?.imageUrl} alt="image" className="w-full h-full object-contain object-center" />
        </figure>
      </td>
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
        {showModalDelete === item?.id && <MysV3ProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MysV3ProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MysV3ProductTable.propTypes;

export default MysV3ProductTable;
