import { useState } from "react";
import { Actions, TimeAgo } from "../../../../components/Components";
import FccBookModalView from "./FccBookModalView";
import FccBookModalDelete from "./FccBookModalDelete";

const FccBookTable = ({ book, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(false);
    if (showModalView) setShowModalView(false);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{book?.title}</td>
      <td className="hidden sm:table-cell">{book?.author}</td>
      <td className="hidden md:table-cell">{book?.publishYear}</td>
      <td className="hidden lg:table-cell">
        <TimeAgo time={book?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={book?.updatedAt} />
      </td>
      <td>
        <Actions
          id={book?._id}
          modalView={() => setShowModalView(true)}
          modalDelete={() => setShowModalDelete(true)}
          className={"border-none"}
        />
        {showModalDelete && <FccBookModalDelete onClose={onClose} item={book} />}
        {showModalView && <FccBookModalView onClose={onClose} item={book} />}
      </td>
    </tr>
  );
};
FccBookTable.propTypes;

export default FccBookTable;
