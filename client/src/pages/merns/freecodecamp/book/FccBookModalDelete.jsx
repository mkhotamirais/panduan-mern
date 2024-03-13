import { useDispatch } from "react-redux";
import { Modal } from "../../../../components/Components";
import { Button } from "../../../../components/Tags";
import { v1FccDeleteBook, v1FccGetBooks } from "../../../../app/features/freecodecamp/v1FccBookSlice";
import { useSnackbar } from "notistack";

const FccBookModalDelete = ({ onClose, item }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(v1FccDeleteBook(item))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        dispatch(v1FccGetBooks());
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  return (
    <Modal onClose={onClose} id={item?._id}>
      <p>Delete {item.title}, apakah kamu yakin?</p>
      <div className="flex gap-1 mt-3">
        <form onSubmit={onDelete} className="relative">
          <input type="checkbox" autoFocus className="absolute opacity-0" />
          <Button type="submit" className={"bg-red-500 w-auto"}>
            Delete
          </Button>
        </form>
        <Button onClick={onClose} className={"w-auto"}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
FccBookModalDelete.propTypes;

export default FccBookModalDelete;
