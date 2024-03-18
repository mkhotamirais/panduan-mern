import { Modal, TimeAgo } from "../../../../components/Components";

const MysV4ProductModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div>{item?.price?.toLocaleString("id-ID")}</div>
      <div>by {item?.V4User?.name}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MysV4ProductModalView.propTypes;

export default MysV4ProductModalView;
