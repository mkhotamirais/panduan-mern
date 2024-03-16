import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MdV3ProductModalDelete from "./MdV3ProductModalDelete";
import MdV3ProductModalView from "./MdV3ProductModalView";

const MdV3ProductCard = ({ item }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col">
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div className="bg-gray-100 p-2 rounded">
        <figure className="size-32 w-full">
          <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <Actions
        modalView={() => setShowModalView(item?._id)}
        modalDelete={() => setShowModalDelete(item?._id)}
        id={item?._id}
        className={"border-none"}
      />
      {showModalDelete === item?._id && <MdV3ProductModalDelete onClose={onClose} item={item} />}
      {showModalView === item?._id && <MdV3ProductModalView onClose={onClose} item={item} />}
    </div>
  );
};
MdV3ProductCard.propTypes;

export default MdV3ProductCard;
