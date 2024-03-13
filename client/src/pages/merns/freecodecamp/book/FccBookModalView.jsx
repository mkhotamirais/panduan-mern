import { Modal, TimeAgo } from "../../../../components/Components";

const FccBookModalView = ({ onClose, item }) => {
  return (
    <Modal onClose={onClose} id={item._id}>
      <div>{item?.title}</div>
      <div>{item?.author}</div>
      <div>{item?.publishYear}</div>
      <div>
        <TimeAgo time={item?.createdAt} />
      </div>
      <div>
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
FccBookModalView.propTypes;

export default FccBookModalView;
