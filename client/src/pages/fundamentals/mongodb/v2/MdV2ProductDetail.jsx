import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";

const MdV2ProductDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.mdV2Product.data.find((s) => s._id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <div>{item?.name}</div>
        <div>{item?.price}</div>
        <div>{item?.categoryId?.name}</div>
        <div>{item?.description}</div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </>
    );
  }
  return <div className="border rounded p-3 flex flex-col gap-3">{content}</div>;
};
MdV2ProductDetail.propTypes;

export default MdV2ProductDetail;
