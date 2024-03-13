import { useSnackbar } from "notistack";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { useDeleteProductMutation } from "../../../../app/features/reduxRtk/productApiSlice";

const ReduxRtkModalDelete = ({ item, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [deleteProduct] = useDeleteProductMutation();

  const onDelete = (e) => {
    e.preventDefault();
    deleteProduct(item.id)
      .unwrap()
      .then(() => {
        enqueueSnackbar(`delete ${item?.name} berhasil`, { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar(`delete ${item?.name} gagal`, { variant: "error" });
      });
  };

  return (
    <Modal onClose={onClose} id={item.id}>
      <p>Delete {item?.name}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
ReduxRtkModalDelete.propTypes;

export default ReduxRtkModalDelete;
