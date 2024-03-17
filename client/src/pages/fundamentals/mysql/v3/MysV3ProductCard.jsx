import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV3ProductModalDelete from "./MysV3ProductModalDelete";
import MysV3ProductModalView from "./MysV3ProductModalView";

const MysV3ProductCard = ({ item }) => {
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
      <div className="bg-gray-100 p-2 rounded">
        <figure className="size-32 w-full">
          <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <Actions modalView={() => setShowModalView(item?.id)} modalDelete={() => setShowModalDelete(item?.id)} id={item?.id} />
      {showModalDelete === item?.id && <MysV3ProductModalDelete onClose={onClose} item={item} />}
      {showModalView === item?.id && <MysV3ProductModalView onClose={onClose} item={item} />}
    </div>
  );
};
MysV3ProductCard.propTypes;

export default MysV3ProductCard;
