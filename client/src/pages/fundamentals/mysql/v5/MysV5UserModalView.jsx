import { Modal, TimeAgo } from "../../../../components/Components";

const MysV5UserModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div>{item?.role}</div>
      <div>{item?.email}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MysV5UserModalView.propTypes;

export default MysV5UserModalView;
