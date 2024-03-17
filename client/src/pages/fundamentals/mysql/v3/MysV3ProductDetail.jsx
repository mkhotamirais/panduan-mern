import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";

const MysV3ProductDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.mysV3Product.data.find((s) => s.id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <div>{item?.name}</div>
        <div className="flex-1 bg-gray-100 rounded p-2">
          <figure className="size-64 w-full">
            <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
          </figure>
        </div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </>
    );
  }
  return <div className="border rounded p-3 flex flex-col gap-3">{content}</div>;
};
MysV3ProductDetail.propTypes;

export default MysV3ProductDetail;
