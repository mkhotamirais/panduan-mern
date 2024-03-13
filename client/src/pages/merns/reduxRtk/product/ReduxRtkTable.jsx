import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import ReduxRtkModalDelete from "./ReduxRtkModalDelete";
import ReduxRtkModalView from "./ReduxRtkModalView";

const ReduxRtkTable = ({ item, i }) => {
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
      <td className="hidden sm:table-cell">{item?.price}</td>
      <td className="hidden md:table-cell">{item?.description}</td>
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
        {showModalDelete === item?.id && <ReduxRtkModalDelete onClose={onClose} item={item} />}
        {showModalView === item?.id && <ReduxRtkModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
ReduxRtkTable.propTypes;

export default ReduxRtkTable;
