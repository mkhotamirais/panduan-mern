import { FaCheck, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setEditMode, updateCategory } from "../../../../app/features/eduwork/edwCategorySlice";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import EdwCategoryModalDelete from "./EdwCategoryModalDelete";

const EdwCategoryList = ({ cat }) => {
  const { editMode } = useSelector((state) => state.edwCategory);
  const [name, setName] = useState(cat?.name);
  const dispatch = useDispatch();
  const [openModalDelete, setOpenModalDelete] = useState(null);

  const enterEditMode = () => {
    dispatch(setEditMode(cat?._id));
  };

  const cancelEditMode = () => {
    dispatch(setEditMode(null));
    setName(cat?.name);
  };

  function onClose() {
    setOpenModalDelete(null);
  }

  const saveCategory = () => {
    dispatch(updateCategory({ id: cat?._id, name }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
        dispatch(getCategories());
        dispatch(setEditMode(null));
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err?.message, { variant: "error" });
      });
  };

  return (
    <div className="border rounded p-1 flex justify-between items-center">
      {editMode === cat?._id ? (
        <>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full mr-2 rounded p-1"
          />
          <div className="flex gap-3">
            <Button onClick={saveCategory}>
              <FaCheck />
            </Button>
            <Button onClick={cancelEditMode} className={"bg-red-500"}>
              <FaTimes />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="p-1 border border-transparent">{cat?.name}</div>
          <div className="flex gap-3 ">
            <Button onClick={enterEditMode}>
              <FaEdit />
            </Button>
            <Button onClick={() => setOpenModalDelete(cat?._id)} className={"bg-red-500"}>
              <FaTrashAlt />
            </Button>
            {openModalDelete && <EdwCategoryModalDelete cat={cat} onClose={onClose} />}
          </div>
        </>
      )}
    </div>
  );
};
EdwCategoryList.propTypes;

export default EdwCategoryList;
