import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV5ProductModalDelete from "./MysV5ProductModalDelete";
import MysV5ProductModalView from "./MysV5ProductModalView";

const MysV5ProductCard = ({ item }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2">
      <div className="text-sm text-gray-500">ID:{item?.id}</div>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>by {item?.V5User?.name}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <Actions modalView={() => setShowModalView(item?.id)} modalDelete={() => setShowModalDelete(item?.id)} id={item?.id} />
      {showModalDelete === item?.id && <MysV5ProductModalDelete onClose={onClose} item={item} />}
      {showModalView === item?.id && <MysV5ProductModalView onClose={onClose} item={item} />}
    </div>
  );
};
MysV5ProductCard.propTypes;

export default MysV5ProductCard;
