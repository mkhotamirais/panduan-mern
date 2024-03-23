import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../app/features/eduwork/edwCategorySlice";
import { Err, Loading } from "../../../../components/Components";
import EdwCategoryList from "./EdwCategoryList";
import EdwCategoryPost from "./EdwCategoryPost";

const EdwCategory = () => {
  const dispatch = useDispatch();
  const { data: categories, status, error } = useSelector((state) => state.edwCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    if (categories?.length > 0) {
      const renderedCategory = categories.map((cat) => <EdwCategoryList key={cat._id} cat={cat} />);
      content = <div className="flex flex-col gap-2 my-2">{renderedCategory}</div>;
    } else if (categories?.length === 0) content = <div className="flex justify-center mt-5">data empty</div>;
  }
  return (
    <div className="border rounded p-3">
      <EdwCategoryPost />
      {content}
    </div>
  );
};

export default EdwCategory;
