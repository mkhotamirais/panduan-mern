import { Modal, TimeAgo } from "../../../../components/Components";

const MysV3ProductModalView = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div>{item?.name}</div>
      <div className="bg-gray-100 p-2 rounded w-full">
        <figure className="size-64 w-full">
          <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MysV3ProductModalView.propTypes;

export default MysV3ProductModalView;
