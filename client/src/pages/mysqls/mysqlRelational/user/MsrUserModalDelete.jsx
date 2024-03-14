import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../../../../app/features/mysqlRelational/msrUserSlice";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";

const MsrUserModalDelete = ({ onClose, item }) => {
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
    <Modal onClose={onClose} id={item.id}>
      <p>Delete {item?.name}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
MsrUserModalDelete.propTypes;

export default MsrUserModalDelete;
