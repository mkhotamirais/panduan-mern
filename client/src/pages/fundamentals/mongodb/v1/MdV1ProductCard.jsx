import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MdV1ProductModalDelete from "./MdV1ProductModalDelete";
import MdV1ProductModalView from "./MdV1ProductModalView";

const MdV1ProductCard = ({ item }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2">
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>{item?.description}</div>
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
      />
      {showModalDelete === item?._id && <MdV1ProductModalDelete onClose={onClose} item={item} />}
      {showModalView === item?._id && <MdV1ProductModalView onClose={onClose} item={item} />}
    </div>
  );
};
MdV1ProductCard.propTypes;

export default MdV1ProductCard;
