import { useSnackbar } from "notistack";
import { ConfirmModalDelete, Modal } from "../../../../components/Components";
import { useDeleteUserMutation } from "../../../../app/api/dgApiEndpoint/dgV2UsersApiSlice";

const DgV2UserModalDelete = ({ item, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteUser] = useDeleteUserMutation();

  // useEffect(() => {
  //   console.log(item?._id);
  // }, []);
  const onDelete = (e) => {
    e.preventDefault();
    deleteUser({ id: item?._id })
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err?.data, { variant: "error" });
        onClose();
      });
  };

  return (
    <Modal onClose={onClose} id={item?._id}>
      <p>Delete {item?.username}, apakah kamu yakin?</p>
      <ConfirmModalDelete onClose={onClose} onDelete={onDelete} />
    </Modal>
  );
};
DgV2UserModalDelete.propTypes;

export default DgV2UserModalDelete;
