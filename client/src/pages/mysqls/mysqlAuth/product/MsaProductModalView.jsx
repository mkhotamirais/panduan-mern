import { Modal, TimeAgo } from "../../../../components/Components";

const MsaProductModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MsaProductModalView.propTypes;

export default MsaProductModalView;
