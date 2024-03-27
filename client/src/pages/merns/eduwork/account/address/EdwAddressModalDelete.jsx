import { useDispatch, useSelector } from "react-redux";
import { ConfirmModalDelete, Modal } from "../../../../../components/Components";
import { enqueueSnackbar } from "notistack";
import { deleteAddress, getAddress } from "../../../../../app/features/eduwork/edwAddressSlice";

const EdwAddressModalDelete = ({ item, onClose }) => {
  const { cred: user } = useSelector((state) => state.edwAuth);
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteAddress({ data: item, token: user?.signed }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
        dispatch(getAddress(user?.signed));
      })
      .catch((err) => {
        enqueueSnackbar(err?.message, { variant: "error" });
      });
  };
  return (
    <Modal onClose={onClose} id={item?._id}>
      <p>Delete {item?.name}, apakah kamu yakin?</p>
      <ConfirmModalDelete onDelete={onDelete} onClose={onClose} />
    </Modal>
  );
};
EdwAddressModalDelete.propTypes;

export default EdwAddressModalDelete;
