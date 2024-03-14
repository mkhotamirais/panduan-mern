import { TimeAgo } from "../../../../components/Components";

const MsfUserCard = ({ item }) => {
  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col">
      <div className="text-sm text-gray-500">ID:{item?.id}</div>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>{item?.description}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
    </div>
  );
};
MsfUserCard.propTypes;

export default MsfUserCard;
