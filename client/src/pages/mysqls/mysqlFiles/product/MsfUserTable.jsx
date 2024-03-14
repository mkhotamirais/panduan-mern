import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import MsfUserModalDelete from "./MsfUserModalDelete";
import MsfUserModalView from "./MsfUserModalView";

const MsfUserTable = ({ item, i }) => {
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
          <img src={item?.image_url} alt="image" className="w-full h-full object-contain object-center" />
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
          modalView={() => setShowModalView(item?.id)}
          modalDelete={() => setShowModalDelete(item?.id)}
          id={item?.id}
          className={"border-none"}
        />
        {showModalDelete === item?.id && <MsfUserModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <MsfUserModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
MsfUserTable.propTypes;

export default MsfUserTable;
