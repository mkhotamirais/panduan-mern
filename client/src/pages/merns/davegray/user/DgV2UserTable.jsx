import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import DgV2UserModalDelete from "./DgV2UserModalDelete";
import DgV2UserModalView from "./DgV2UserModalView";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../../app/api/dgApiEndpoint/dgV2UsersApiSlice";

const DgV2UserTable = ({ id, i }) => {
  const item = useSelector((state) => selectUserById(state, id));
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item?.username}</td>
      <td className="hidden sm:table-cell">{item?.roles.join(", ")}</td>
      <td className="hidden lg:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      <td>
        <Actions
          modalView={() => setShowModalView(item?._id)}
          modalDelete={() => setShowModalDelete(item?._id)}
          id={item?._id}
          className={"border-none"}
        />
        {showModalDelete === item?._id && <DgV2UserModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <DgV2UserModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
DgV2UserTable.propTypes;

export default DgV2UserTable;
