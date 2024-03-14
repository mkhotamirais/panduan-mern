import { Modal, TimeAgo } from "../../../../components/Components";

const MsrUserModalView = ({ onClose, item }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div>{item?.age}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MsrUserModalView.propTypes;

export default MsrUserModalView;
