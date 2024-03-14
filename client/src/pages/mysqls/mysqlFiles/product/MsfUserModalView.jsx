import { Modal, TimeAgo } from "../../../../components/Components";

const MsfUserModalView = ({ onClose, item }) => {
  return (
    <Modal onClose={onClose} id={item?.id}>
      <div className="self-stretch bg-slate-100 rounded-lg p-1">
        <figure className="w-full h-[50vh]">
          <img src={item?.image_url} alt="image" className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>{item?.name}</div>
      <div className="flex flex-col items-start text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </Modal>
  );
};
MsfUserModalView.propTypes;

export default MsfUserModalView;
