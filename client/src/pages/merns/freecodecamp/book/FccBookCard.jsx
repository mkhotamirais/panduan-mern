import { useState } from "react";
import { Actions } from "../../../../components/Components";
import FccBookModalDelete from "./FccBookModalDelete";
import FccBookModalView from "./FccBookModalView";

const FccBookCard = ({ book }) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(false);
    if (showModalView) setShowModalView(false);
  };
  // useEffect(() => {
  //   console.log(book);
  // }, []);

  return (
    <div className="border rounded p-3 text-gray-700">
      <div className="text-sm text-gray-600">{book?._id}</div>
      <div>{book?.title}</div>
      <div>{book?.author}</div>
      <div>{book?.publishYear}</div>
      <Actions
        id={book?._id}
        modalView={() => setShowModalView(true)}
        modalDelete={() => setShowModalDelete(true)}
        className={"mt-2"}
      />
      {showModalDelete && <FccBookModalDelete onClose={onClose} item={book} />}
      {showModalView && <FccBookModalView onClose={onClose} item={book} />}
    </div>
  );
};
FccBookCard.propTypes;

export default FccBookCard;
