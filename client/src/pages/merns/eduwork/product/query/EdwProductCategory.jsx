import { useDispatch, useSelector } from "react-redux";
import { Select } from "../../../../../components/Tags";
import { setCurrentPage, setQuery } from "../../../../../app/features/eduwork/edwProductSlice";

const EdwProductCategory = () => {
  const { data: category } = useSelector((state) => state.edwCategory);
  const { query } = useSelector((state) => state.edwProduct);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setQuery({ ...query, [e.target.name]: e.target.value }));
    dispatch(setCurrentPage(1));
  };

  const renderedCategory =
    category?.length &&
    category.map((cat) => (
      <option key={cat?._id} value={cat?.name}>
        {cat?.name}
      </option>
    ));
  return (
    <div className="flex-1 min-w-max max-w-fit">
      <Select id="category" onChange={handleChange}>
        <option value="">category</option>
        {renderedCategory}
      </Select>
    </div>
  );
};

export default EdwProductCategory;
