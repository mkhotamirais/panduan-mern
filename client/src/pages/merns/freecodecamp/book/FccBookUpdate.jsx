import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { setSort, v1FccGetBooks, v1FccUpdateBook } from "../../../../app/features/freecodecamp/v1FccBookSlice";
import { PiSpinner } from "react-icons/pi";

const FccBookUpdate = () => {
  const { id } = useParams();
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const item = useSelector((state) => state?.v1FccBook.data.find((s) => s?._id.toString() === id));

  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setAuthor(item?.author);
      setPublishYear(item?.publishYear);
    }
  }, [item]);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const { status } = useSelector((state) => state.v1FccBook);
  const canSave = [title, author, publishYear].every(Boolean);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { id, title, author, publishYear };
      dispatch(v1FccUpdateBook(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          navigate(-1);
          dispatch(setSort("updatedAt"));
          dispatch(v1FccGetBooks());
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <Label id="title">title</Label>
        <InputRef ref={titleRef} id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label id="author">author</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Label id="publishYear">publishYear</Label>
        <Input type="number" id="publishYear" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        <Button disabled={!canSave} type="submit" className={"p-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "update"}
        </Button>
      </form>
    </div>
  );
};

export default FccBookUpdate;
