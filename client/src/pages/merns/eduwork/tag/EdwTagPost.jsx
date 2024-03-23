import { useState } from "react";
import { Button } from "../../../../components/Tags";
import { useDispatch } from "react-redux";
import { getTags, postTag } from "../../../../app/features/eduwork/edwTagSlice";
import { enqueueSnackbar } from "notistack";

const EdwTagPost = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(postTag({ name }))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res?.message, { variant: "success" });
          setName("");
          dispatch(getTags());
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
          type="add tag"
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

export default EdwTagPost;
