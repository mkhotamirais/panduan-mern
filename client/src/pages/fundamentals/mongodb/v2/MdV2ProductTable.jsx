import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MdV2ProductModalDelete from "./MdV2ProductModalDelete";
import MdV2ProductModalView from "./MdV2ProductModalView";

const MdV2ProductTable = ({ item, i }) => {
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
      <td className="hidden md:table-cell">{item?.categoryId?.name}</td>
      <td className="hidden md:table-cell">{item?.description}</td>
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
        {showModalDelete === item?._id && <MdV2ProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <MdV2ProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MdV2ProductTable.propTypes;

export default MdV2ProductTable;
