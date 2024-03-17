import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../../../../app/features/mysql/mysV2UserSlice";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";

const MysV2UserModalDelete = ({ item, onClose }) => {
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
    <Modal onClose={onClose} id={item?.id}>
      <p>Delete {item?.name}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
MysV2UserModalDelete.propTypes;

export default MysV2UserModalDelete;
