import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import DgV2UserModalDelete from "./DgV2UserModalDelete";
import DgV2UserModalView from "./DgV2UserModalView";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../../app/api/dgApiEndpoint/dgV2UsersApiSlice";

const DgV2UserCard = ({ id }) => {
  const item = useSelector((state) => selectUserById(state, id));
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col gap-2">
      <div className="text-sm text-gray-500">ID:{item?._id}</div>
      <div>{item?.username}</div>
      <div>{item?.roles.join(", ")}</div>
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
      {showModalDelete === item?._id && <DgV2UserModalDelete onClose={onClose} item={item} />}
      {showModalView === item?._id && <DgV2UserModalView onClose={onClose} item={item} />}
    </div>
  );
};
DgV2UserCard.propTypes;

export default DgV2UserCard;
