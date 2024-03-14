import { useParams } from "react-router-dom";
import { TimeAgo } from "../../../../components/Components";
import { useSelector } from "react-redux";

const MsfUserDetail = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.msfUser.data.find((s) => s.id.toString() === id));

  let content;
  if (item) {
    content = (
      <>
        <div className="self-stretch bg-slate-100 rounded-lg p-1">
          <figure className="w-full h-[50vh]">
            <img src={item?.image_url} alt="image" className="w-full h-full object-contain object-center" />
          </figure>
        </div>
        <div>{item?.name}</div>
        <div className="flex flex-col items-start text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </>
    );
  }
  return <div className="border rounded p-3 flex flex-col gap-3">{content}</div>;
};

export default MsfUserDetail;
