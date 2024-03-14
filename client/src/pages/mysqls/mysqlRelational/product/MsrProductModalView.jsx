import { Modal, TimeAgo } from "../../../../components/Components";

const MsrProductModalView = ({ onClose, item }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>By {item?.User?.name}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MsrProductModalView.propTypes;

export default MsrProductModalView;
