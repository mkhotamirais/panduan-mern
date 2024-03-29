import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { deleteUser, getUsers } from "../../../../app/features/eduwork/edwUserSlice";

const EdwUserModalDelete = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser(item))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        dispatch(getUsers());
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  return (
    <Modal onClose={onClose} id={item?._id}>
      <p>Delete {item?.name}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
EdwUserModalDelete.propTypes;

export default EdwUserModalDelete;
