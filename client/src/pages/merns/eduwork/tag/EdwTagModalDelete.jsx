import { useDispatch } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { enqueueSnackbar } from "notistack";
import { deleteTag, getTags } from "../../../../app/features/eduwork/edwTagSlice";

const EdwTagModalDelete = ({ tag, onClose }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTag(tag))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
        dispatch(getTags());
      })
      .catch((err) => {
        enqueueSnackbar(err?.message, { variant: "error" });
      });
  };
  return (
    <Modal id={tag?._id} onClose={onClose}>
      <p>apakah anda yakin</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
EdwTagModalDelete.propTypes;

export default EdwTagModalDelete;
