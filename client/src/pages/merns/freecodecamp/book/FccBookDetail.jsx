import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";

const FccBookDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state?.v1FccBook?.data.find((s) => s?._id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <p>{id}</p> <div>{item?.title}</div>
        <div>{item?.author}</div>
        <div>{item?.publishYear}</div>
        <div>
          <TimeAgo time={item?.createdAt} />
        </div>
        <div>
          <TimeAgo time={item?.updatedAt} />
        </div>
      </>
    );
  }
  return <div className="border rounded p-3">{content}</div>;
};

export default FccBookDetail;
