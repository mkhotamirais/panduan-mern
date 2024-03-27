import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";

const EdwUserDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.edwUser.data.find((s) => s._id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <div>{item?.fullName}</div>
        <div>{item?.email}</div>
        <div>{item?.role}</div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </>
    );
  }
  return <div className="border rounded p-3 flex flex-col gap-3">{content}</div>;
};
EdwUserDetail.propTypes;

export default EdwUserDetail;
