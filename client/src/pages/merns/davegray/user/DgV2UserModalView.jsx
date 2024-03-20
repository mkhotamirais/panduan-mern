import { Modal, TimeAgo } from "../../../../components/Components";

const DgV2UserModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?._id}>
      <div>{item?.name}</div>
      <div>{item?.price?.toLocaleString("id-ID")}</div>
      <div>{item?.categoryId?.name}</div>
      <div>{item?.description}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
DgV2UserModalView.propTypes;

export default DgV2UserModalView;
