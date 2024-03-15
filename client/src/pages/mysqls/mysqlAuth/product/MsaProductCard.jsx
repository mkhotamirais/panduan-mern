import { TimeAgo } from "../../../../components/Components";

const MsaProductCard = ({ item }) => {
  return (
    <div className="border rounded p-2 text-gray-700 flex flex-col">
      <div className="text-sm text-gray-500">ID:{item?.id}</div>
      <div>{item?.name}</div>
      <div>{item?.age}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
    </div>
  );
};
MsaProductCard.propTypes;

export default MsaProductCard;
