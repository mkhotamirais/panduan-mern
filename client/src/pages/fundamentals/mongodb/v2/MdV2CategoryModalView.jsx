import { Modal, TimeAgo } from "../../../../components/Components";

const MdV2CategoryModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?._id}>
      <div>{item?.name}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MdV2CategoryModalView.propTypes;

export default MdV2CategoryModalView;
