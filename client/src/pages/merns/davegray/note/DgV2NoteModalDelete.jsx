// import { useSnackbar } from "notistack";
// import { useDispatch } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";

const DgV2NoteModalDelete = ({ item, onClose }) => {
  // const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const onDelete = (e) => {
    e.preventDefault();
    //   dispatch(deleteProduct(item))
    //     .unwrap()
    //     .then((res) => {
    //       enqueueSnackbar(res.message, { variant: "success" });
    //       dispatch(getProducts());
    //     })
    //     .catch((err) => {
    //       enqueueSnackbar(err, { variant: "error" });
    //     });
  };

  return (
    <Modal onClose={onClose} id={item?._id}>
      <p>Delete {item?.title}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
DgV2NoteModalDelete.propTypes;

export default DgV2NoteModalDelete;
