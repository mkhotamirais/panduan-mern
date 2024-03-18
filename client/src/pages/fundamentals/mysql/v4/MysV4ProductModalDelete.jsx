import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../../../../app/features/mysql/mysV4ProductSlice";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";

const MysV4ProductModalDelete = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(item))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        dispatch(getProducts());
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
MysV4ProductModalDelete.propTypes;

export default MysV4ProductModalDelete;
