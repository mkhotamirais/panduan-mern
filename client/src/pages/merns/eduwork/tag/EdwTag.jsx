import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../../../app/features/eduwork/edwTagSlice";
import { Err, Loading } from "../../../../components/Components";
import EdwTagList from "./EdwTagList";
import EdwTagPost from "./EdwTagPost";

const EdwTag = () => {
  const dispatch = useDispatch();
  const { data: tags, status, error } = useSelector((state) => state.edwTag);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    if (tags?.length > 0) {
      const renderedTag = tags.map((tag) => <EdwTagList key={tag._id} tag={tag} />);
      content = <div className="flex flex-col gap-2 my-2">{renderedTag}</div>;
    } else if (tags?.length === 0) content = <div className="flex justify-center mt-5">data empty</div>;
  }
  return (
    <div className="border rounded p-3">
      <EdwTagPost />
      {content}
    </div>
  );
};

export default EdwTag;
