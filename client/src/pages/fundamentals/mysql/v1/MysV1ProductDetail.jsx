import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";

const MysV1ProductDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.mysV1Product.data.find((s) => s.id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <div>{item?.name}</div>
        <div>{item?.price}</div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </>
    );
  }
  return <div className="border rounded p-3 flex flex-col gap-3">{content}</div>;
};
MysV1ProductDetail.propTypes;

export default MysV1ProductDetail;
