import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../../../../../components/Components";
import { setCurrentPage, setTags } from "../../../../../app/features/eduwork/edwProductSlice";

const EdwProductTags = () => {
  const { data: tags } = useSelector((state) => state.edwTag);
  const { tags: tagQuery } = useSelector((state) => state.edwProduct);
  const dispatch = useDispatch();

  const handleClick = (name) => {
    if (tagQuery.includes(name)) {
      dispatch(setTags(tagQuery.filter((t) => t !== name)));
    } else dispatch(setTags([...tagQuery, name]));
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      {tags.map((t) => (
        <Badge
          onClick={() => handleClick(t?.name)}
          key={t?._id}
          item={t}
          className={`${tagQuery.includes(t?.name) ? "bg-blue-500" : "bg-gray-500"} cursor-pointer hover:bg-blue-500`}
        />
      ))}
    </div>
  );
};

export default EdwProductTags;
