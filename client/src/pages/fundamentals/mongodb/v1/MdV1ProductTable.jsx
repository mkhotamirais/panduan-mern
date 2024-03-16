import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MdV1ProductModalDelete from "./MdV1ProductModalDelete";
import MdV1ProductModalView from "./MdV1ProductModalView";

const MdV1ProductTable = ({ item, i }) => {
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
      <td className="hidden sm:table-cell">Rp{item?.price?.toLocaleString("id-ID")}</td>
      <td className="hidden md:table-cell">Rp{item?.description}</td>
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
        {showModalDelete === item?._id && <MdV1ProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <MdV1ProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MdV1ProductTable.propTypes;

export default MdV1ProductTable;
