import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Label } from "../../../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { v1FccGetBooks, v1FccPostBook } from "../../../../app/features/freecodecamp/v1FccBookSlice";
import { PiSpinner } from "react-icons/pi";

const FccBookPost = () => {
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const { status } = useSelector((state) => state.v1FccBook);
  const canSave = [title, author, publishYear].every(Boolean);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    if (canSave) {
      const data = { title, author, publishYear };
      dispatch(v1FccPostBook(data))
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          navigate(-1);
          dispatch(v1FccGetBooks());
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    }
  };
  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <div>
      <form onSubmit={handlePost}>
        <Label id="title">title</Label>
        <InputRef ref={titleRef} id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label id="author">author</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Label id="publishYear">publishYear</Label>
        <Input type="number" id="publishYear" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        <Button disabled={!canSave} type="submit" className={"p-2"}>
          {status === "loading" ? <PiSpinner className="animate-spin inline text-xl" /> : "post"}
        </Button>
      </form>
    </div>
  );
};

export default FccBookPost;
