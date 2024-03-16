import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MdV3ProductModalDelete from "./MdV3ProductModalDelete";
import MdV3ProductModalView from "./MdV3ProductModalView";

const MdV3ProductTable = ({ item, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td className="flex justify-center">
        <figure className="w-24 h-24">
          <img src={item?.imageUrl} alt="image" className="w-full h-full object-contain object-center" />
        </figure>
      </td>
      <td className="hidden sm:table-cell">{item?.name}</td>
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
        {showModalDelete === item?._id && <MdV3ProductModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <MdV3ProductModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MdV3ProductTable.propTypes;

export default MdV3ProductTable;
