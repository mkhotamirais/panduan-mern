import { useState } from "react";
import { Button } from "../../../../components/Tags";
import { useDispatch } from "react-redux";
import { getCategories, postCategory } from "../../../../app/features/eduwork/edwCategorySlice";
import { enqueueSnackbar } from "notistack";

const EdwCategoryPost = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(postCategory({ name }))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res?.message, { variant: "success" });
          setName("");
          dispatch(getCategories());
        })
        .catch((err) => {
          enqueueSnackbar(err?.message, { variant: "error" });
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          autoFocus
          type="add category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <Button type="submit" className={"max-w-max"}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default EdwCategoryPost;
