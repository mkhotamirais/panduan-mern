import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MysV5UserModalDelete from "./MysV5UserModalDelete";
import MysV5UserModalView from "./MysV5UserModalView";

const MysV5UserCard = ({ item }) => {
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
      <div>{item?.role}</div>
      <div>{item?.email}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <Actions modalView={() => setShowModalView(item?.id)} modalDelete={() => setShowModalDelete(item?.id)} id={item?.id} />
      {showModalDelete === item?.id && <MysV5UserModalDelete onClose={onClose} item={item} />}
      {showModalView === item?.id && <MysV5UserModalView onClose={onClose} item={item} />}
    </div>
  );
};
MysV5UserCard.propTypes;

export default MysV5UserCard;
