import { Modal, TimeAgo } from "../../../../components/Components";

const MysV2UserModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MysV2UserModalView.propTypes;

export default MysV2UserModalView;
