import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";

const MdV3ProductDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.mdV3Product.data.find((s) => s._id.toString() === id));

  let content;
  if (item) {
    content = (
      <div className="flex gap-5 flex-col sm:flex-row">
        <div className="flex-1 bg-gray-100 rounded p-2">
          <figure className="size-64 w-full">
            <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
          </figure>
        </div>
        <div className="flex-1">
          <div>{item?.name}</div>
          <div>{item?.price}</div>
          <div className="flex flex-col text-sm">
            <TimeAgo time={item?.createdAt} />
            <TimeAgo time={item?.updatedAt} />
          </div>
        </div>
      </div>
    );
  }
  return <div className="border rounded p-3 flex flex-col gap-3">{content}</div>;
};

export default MdV3ProductDetail;
