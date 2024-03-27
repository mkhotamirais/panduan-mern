import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Badge, TimeAgo } from "../../../../components/Components";

const EdwProductDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.edwProduct.data.find((s) => s._id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <div className="bg-gray-100 p-2 rounded w-full">
          <figure className="size-64 w-full">
            <img src={item?.imageUrl} alt="" className="w-full h-full object-contain object-center" />
          </figure>
        </div>
        <div>{item?.name}</div>
        <div>{item?.price}</div>
        <div>{item?.description}</div>
        <div className="capitalize">Category: {item?.category?.name}</div>
        <div>
          Tags:{" "}
          {item?.tags?.map((t) => (
            <Badge key={t?._id} item={t} />
          ))}
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
EdwProductDetail.propTypes;

export default EdwProductDetail;
