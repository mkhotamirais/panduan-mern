import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { deleteProduct, getProducts } from "../../../../app/features/eduwork/edwProductSlice";

const EdwProductModalDelete = ({ item, onClose }) => {
  const { cred: user } = useSelector((state) => state.edwAuth);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProduct({ data: item, token: user?.signed }))
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
EdwProductModalDelete.propTypes;

export default EdwProductModalDelete;
