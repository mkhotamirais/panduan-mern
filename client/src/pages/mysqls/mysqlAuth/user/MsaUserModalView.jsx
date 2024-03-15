import { Modal, TimeAgo } from "../../../../components/Components";

const MsaUserModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.username}</div>
      <div>{item?.age}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MsaUserModalView.propTypes;

export default MsaUserModalView;
