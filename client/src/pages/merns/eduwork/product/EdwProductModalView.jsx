import { Modal, TimeAgo } from "../../../../components/Components";

const EdwProductModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?._id}>
      <div className="bg-gray-100 p-2 rounded w-full">
        <figure className="size-64 w-full">
          <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>{item?.name}</div>
      <div>{item?.price?.toLocaleString("id-ID")}</div>
      <div>{item?.description}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
EdwProductModalView.propTypes;

export default EdwProductModalView;
