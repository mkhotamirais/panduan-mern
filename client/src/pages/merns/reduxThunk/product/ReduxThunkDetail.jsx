import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProductById } from "../../../../app/features/reduxThunk/reduxThunkSlice";
import { TimeAgo } from "../../../../components/Components";

const ReduxThunkDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => selectProductById(state, id));

  let content;
  if (item) {
    content = (
      <>
        <div>{item?.name}</div>
        <div>{item?.price}</div>
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

export default ReduxThunkDetail;
