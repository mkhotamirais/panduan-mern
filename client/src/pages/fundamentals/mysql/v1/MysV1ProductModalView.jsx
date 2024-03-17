import { Modal, TimeAgo } from "../../../../components/Components";

const MysV1ProductModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div>{item?.price?.toLocaleString("id-ID")}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MysV1ProductModalView.propTypes;

export default MysV1ProductModalView;
