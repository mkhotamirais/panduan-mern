import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { deleteProduct, getProducts } from "../../../../app/features/mongodb/mdV2ProductSlice";

const MdV2ProductModalDelete = ({ item, onClose }) => {
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
    <Modal onClose={onClose} id={item?._id}>
      <p>Delete {item?.name}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
MdV2ProductModalDelete.propTypes;

export default MdV2ProductModalDelete;
