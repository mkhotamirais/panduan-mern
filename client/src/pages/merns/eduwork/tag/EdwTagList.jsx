import { FaCheck, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { getTags, setEditMode, updateTag } from "../../../../app/features/eduwork/edwTagSlice";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import EdwTagModalDelete from "./EdwTagModalDelete";

const EdwTagList = ({ tag }) => {
  const { editMode } = useSelector((state) => state.edwTag);
  const [name, setName] = useState(tag?.name);
  const dispatch = useDispatch();
  const [openModalDelete, setOpenModalDelete] = useState(null);

  const enterEditMode = () => {
    dispatch(setEditMode(tag?._id));
  };

  const cancelEditMode = () => {
    dispatch(setEditMode(null));
    setName(tag?.name);
  };

  function onClose() {
    setOpenModalDelete(null);
  }

  const saveTag = () => {
    dispatch(updateTag({ id: tag?._id, name }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
        dispatch(getTags());
        dispatch(setEditMode(null));
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err?.message, { variant: "error" });
      });
  };

  return (
    <div className="border rounded p-1 flex justify-between items-center">
      {editMode === tag?._id ? (
        <>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full mr-2 rounded p-1"
          />
          <div className="flex gap-3">
            <Button onClick={saveTag}>
              <FaCheck />
            </Button>
            <Button onClick={cancelEditMode} className={"bg-red-500"}>
              <FaTimes />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="p-1 border border-transparent">{tag?.name}</div>
          <div className="flex gap-3 ">
            <Button onClick={enterEditMode}>
              <FaEdit />
            </Button>
            <Button onClick={() => setOpenModalDelete(tag?._id)} className={"bg-red-500"}>
              <FaTrashAlt />
            </Button>
            {openModalDelete && <EdwTagModalDelete tag={tag} onClose={onClose} />}
          </div>
        </>
      )}
    </div>
  );
};
EdwTagList.propTypes;

export default EdwTagList;
