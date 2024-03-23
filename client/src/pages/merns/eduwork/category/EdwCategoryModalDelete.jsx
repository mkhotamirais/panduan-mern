import { useDispatch } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { enqueueSnackbar } from "notistack";
import { deleteCategory, getCategories } from "../../../../app/features/eduwork/edwCategorySlice";

const EdwCategoryModalDelete = ({ cat, onClose }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteCategory(cat))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
        dispatch(getCategories());
      })
      .catch((err) => {
        enqueueSnackbar(err?.message, { variant: "error" });
      });
  };
  return (
    <Modal id={cat?._id} onClose={onClose}>
      <p>apakah anda yakin</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
EdwCategoryModalDelete.propTypes;

export default EdwCategoryModalDelete;
