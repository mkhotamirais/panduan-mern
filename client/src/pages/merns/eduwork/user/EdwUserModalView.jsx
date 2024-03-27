import { Modal, TimeAgo } from "../../../../components/Components";

const EdwUserModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?._id}>
      <div>{item?.fullName}</div>
      <div>{item?.email}</div>
      <div>{item?.role}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
EdwUserModalView.propTypes;

export default EdwUserModalView;
