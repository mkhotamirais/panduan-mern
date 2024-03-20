import { Modal, TimeAgo } from "../../../../components/Components";

const DgV2NoteModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?._id}>
      <div>{item?.title}</div>
      <div>{item?.text}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
DgV2NoteModalView.propTypes;

export default DgV2NoteModalView;
